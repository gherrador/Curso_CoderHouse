const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy
const { Usuarios } = require('../models/usuarioDB');
const { FACEBOOK_CLIENT_ID, FACEBOOK_CLIENT_SECRET } = require('../../config/global');
const facebook_client_id = process.argv[3] || FACEBOOK_CLIENT_ID;
const facebook_client_secret = process.argv[4] || FACEBOOK_CLIENT_SECRET;

module.exports = () => {
    passport.use(new FacebookStrategy({
        clientID: facebook_client_id.toString(),
        clientSecret: facebook_client_secret.toString(),
        callbackURL: '/auth/facebook/callback',
        profileFields: ['id', 'displayName', 'photos', 'emails'],
        scope: ["public_profile", "email"]
    }, async function(accessToken, refreshToken, userProfile, done) {
        findOrCreateUser = function() {
            Usuarios.findOne({ username: userProfile.displayName }, function(err, user) {
                if (err) {
                    console.log('error al registrar:' + err)
                    return done(err)
                }
                if (user) {
                    console.log('el usuario ya existe')
                    return done(null, user)
                } else {
                    let nuevo_usuario = new Usuarios();
                    nuevo_usuario.username = userProfile.displayName,
                        nuevo_usuario.facebookId = userProfile.id,
                        nuevo_usuario.email = userProfile.emails[0].value,
                        nuevo_usuario.foto = userProfile.photos[0].value,
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
        Usuarios.findOne({ username: username }, function(err, username) {
            done(err, username)
        }).lean()
    });
}