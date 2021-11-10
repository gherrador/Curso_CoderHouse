const passport = require('passport')
const express = require("express");
const isAuth = require('../controllers/helpers');
const router = express.Router();




router.get('/', isAuth, async(req, res) => {
    let user = req.user.username
    res.render('index', {
        active: 'index',
        usuario: user
    })
})

// LOGIN
router.get('/login', async(req, res) => {
    res.render('login')
})
router.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin' }), getLogin);
router.get('/faillogin', (req, res) => {
    res.render('login-error', {});
})

function getLogin(req, res) {
    if (req.isAuthenticated()) {
        let user = req.user.username
        console.log('usuario logeado');
        res.render('index', {
            active: 'index',
            usuario: user
        })
    } else {
        console.log('error al logear usuario')
        res.render('login')
    }
}

//SIGNUP
router.get('/signup', getSignup);
router.post('/signup', passport.authenticate('signup', { failureRedirect: '/failregister' }), postSignup)
router.get('/failregister', (req, res) => {
    res.render('register-error', {});
})

function getSignup(req, res) {
    res.render('signup')
}

function postSignup(req, res) {
    let user = req.user.username
    console.log('usuario logeado');
    res.render('index', {
        active: 'index',
        usuario: user

    })
}
/* --------- LOGOUT ---------- */
router.get('/logout', (req, res) => {
    let user = req.user.username
    req.logout();
    res.render('adios', {
        active: 'adios',
        usuario: user
    })
})




module.exports = router;