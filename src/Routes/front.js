const express = require('express');
const router = express.Router();
const isAuth = require('../midleware/autentication');
const passport = require('passport')
const frontRoutes = require('../Controllers/front')


/* ------ FACEBOOK PASSPORT -------*/
router.get('/auth/facebook', passport.authenticate('facebook', { scope: ["public_profile", "email"] }));
router.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/login' }));

/* ------- LOGIN ---------*/

router.get('/login', frontRoutes.login)
router.get('/faillogin', frontRoutes.failLogin)
router.get('/', isAuth, frontRoutes.inicio)

/* --------- LOGOUT ---------- */
router.get('/logout', frontRoutes.logout)


module.exports = router;