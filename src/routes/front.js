const express = require('express');
const router = express.Router();
const { fork } = require('child_process');
const compression = require('compression');
const isAuth = require('../controllers/helpers');
const passport = require('passport')
const { logger, loggererror, loggerwarn } = require('../controllers/logger')

router.get('/auth/facebook', passport.authenticate('facebook', { scope: ["public_profile", "email"] }));
router.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: 'https://codder-app.herokuapp.com', failureRedirect: 'https://codder-app.herokuapp.com/faillogin' }));
router.get('/login', (req, res) => {
        res.render('login')
    })
    // LOGIN

router.get('/login', (req, res) => {
    res.render('login')
})
router.get('/', isAuth, (req, res) => {
    res.render('index', { user: req.user })
})

/* --------- LOGOUT ---------- */
router.get('/logout', (req, res) => {
    res.render('adios', { user: req.user })
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
    const computo = fork('../controllers/computo.js');
    computo.send(cant)
    computo.on("message", numeros => {
        res.render('randoms', {
            active: 'randoms',
            randoms: numeros
        });
    })
})

module.exports = router;