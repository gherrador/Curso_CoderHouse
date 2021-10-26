const express = require('express');
const router = express.Router();

router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/', (req, res) => {
    let user = req.user.username
    res.render('index', {
        active: 'index',
        usuario: user
    })
})

module.exports = router;