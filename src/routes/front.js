const express = require('express');
const router = express.Router();
const { fork } = require('child_process');
const compression = require('compression');
const isAuth = require('../midleware/helpers');
const passport = require('passport')
const { logger, loggererror, loggerwarn } = require('../midleware/logger')
const path = require('path')
const nodemailer = require('nodemailer');
const { GMAIL_PASS } = require('../../config/global');


/* ----- NODEMAILER TRANSPORT ----- */

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: 'abagail.goldner70@ethereal.email',
        pass: 'awVEjrZMTyQqeKvdvW'
    }
});

const transporterGmail = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'herradorgustavo1@gmail.com',
        pass: GMAIL_PASS
    }
});

/* ------ FACEBOOK PASSPORT -------*/
router.get('/auth/facebook', passport.authenticate('facebook', { scope: ["public_profile", "email"] }));
router.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' }));
router.get('/login', (req, res) => {
        res.render('login')
    })
    /* ------- LOGIN ---------*/

router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/faillogin', (req, res) => {
    res.render('login-error')
})

router.get('/', isAuth, (req, res) => {
    const user = req.user;
    let nombre_usuario = user.username;
    let nombre_email = user.email;
    let foto_facebook = user.foto;
    const mailOptionsLogin = {
        from: 'Servidor Login',
        to: 'abagail.goldner70@ethereal.email',
        subject: `Mail de Login de ${nombre_usuario} a las ${new Date().toLocaleString()}`,
        html: `<h1 style="color: blue;">El usuario ${nombre_usuario} se a logueado con Facebook a las ${new Date().toLocaleString()} </h1>`
    };
    const mailOptionsGmail = {
        from: 'Servidor Node.js',
        to: nombre_email,
        subject: `Mail Gmail de ${nombre_usuario} a las ${new Date().toLocaleString()}`,
        html: `<h1 style="color: blue;">El usuario ${nombre_usuario} se a logueado con Facebook a las ${new Date().toLocaleString()} </h1>`,
        attachments: [{ // filename and content type is derived from path
            filename: 'foto_facebook.jpg',
            path: foto_facebook
        }]
    }

    transporter.sendMail(mailOptionsLogin, (err, info) => {
        if (err) {
            console.log(err)
            return err
        }
    })
    transporterGmail.sendMail(mailOptionsGmail, (err, info) => {
        if (err) {
            console.log(err)
            return err
        }
    })
    res.render('index', { user: req.user })
})

/* --------- LOGOUT ---------- */
router.get('/logout', (req, res) => {
    res.render('adios', { user: req.user })
    const user = req.user;
    let nombre_usuario = user.username;
    const mailOptionsLogout = {
        from: 'Servidor Logout',
        to: 'abagail.goldner70@ethereal.email',
        subject: `Mail de Logout de ${nombre_usuario} a las ${new Date().toLocaleString()}`,
        html: `<h1 style="color: blue;">El usuario ${nombre_usuario} se a deslogueado a las ${new Date().toLocaleString()} </h1>`
    };
    transporter.sendMail(mailOptionsLogout, (err, info) => {
        if (err) {
            console.log(err)
            return err
        }
        console.log(info)
    })
    req.logout();
})


/* --------- INFO ---------- */
router.get('/info', compression(), (req, res) => {
    try {
        logger.info('Información obtenida correctamente')
        loggerwarn.warn('Mensaje warn -----------------> OK')
        loggererror.error('Mensaje error ----------------->Sin errores')
        const numCPUs = require('os').cpus().length
        res.render('info', {
            user: req.user,
            info: process,
            argv: process.argv,
            memoryUsage: process.memoryUsage(),
            numCPUs: numCPUs,
        });
    } catch (err) {
        logger.warn('Error message: ' + err)
        logger.info('Error message: ' + err);
        logger.error('Error message: ' + err);
    }
})

/* --------- RANDOMS ---------- */
router.get('/randoms', (req, res) => {
    const cant = req.query.cant
    const computo = fork(path.join(__dirname, '../midleware/computo.js'));
    computo.send(cant)
    computo.on("message", numeros => {
        res.render('randoms', {
            active: 'randoms',
            randoms: numeros
        });
    })
})

module.exports = router;