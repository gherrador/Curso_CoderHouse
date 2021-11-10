const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const { Usuarios } = require('../models/usuarioDB');
const { createHash, isValidPassword } = require('../controllers/hasspass')


module.exports = () => {
    passport.use('login', new LocalStrategy({ passReqToCallback: true }, async(req, username, password, done) => {
        Usuarios.findOne({ username: username },
            function(err, user) {
                if (err)
                    return done(err)
                if (!user) {
                    console.log('usuario no encontrado con el nombre:' + username)
                    return done(null, false)
                }
                if (!isValidPassword(user, password)) {
                    console.log('password incorrecto')
                    return done(null, false)
                }
                return done(null, user)
            }
        )
    }))
    passport.use('signup', new LocalStrategy({ passReqToCallback: true }, async(req, username, password, done) => {
        const { direccion } = req.body
        findOrCreateUser = function() {
            Usuarios.findOne({ username: username }, function(err, user) {
                if (err) {
                    console.log('error al registrar:' + err)
                    return done(err)
                }
                if (user) {
                    console.log('el usuario ya existe')
                    return done(null, false)
                } else {
                    let nuevo_usuario = new Usuarios();
                    nuevo_usuario.username = username;
                    nuevo_usuario.password = createHash(password);
                    nuevo_usuario.direccion = direccion
                    nuevo_usuario.save(function(err) {
                        if (err) {
                            console.log('error al guardar el usuario:' + err)
                            throw err;
                        }
                        console.log('usuario registrado exitosamente')
                        return done(null, nuevo_usuario)
                    })
                }
            })
        }
        process.nextTick(findOrCreateUser)
    }))


    passport.serializeUser(function(user, done) {
        done(null, user.username);
    });

    passport.deserializeUser(async function(username, done) {
        Usuarios.findOne({ username: username }, function(err, user) {
            done(err, user)
        })
    });
}