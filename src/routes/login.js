const express = require('express');
const router = express.Router();

this.nombre = '';

router.get('/login', (req, res) => {
    if (req.session.username) {
        res.render('index', {
            active: 'index',
            usuario: req.session.username
        })
    } else {
        res.render('login')
    }
});


router.get('/error', (req, res) => {
    res.render('errorlogeo')
})

router.post("/", (req, res) => {
    this.nombre = req.body.nombre;
    req.session.username = this.nombre
    if (req.session.username) {
        res.render('index', {
            active: 'index',
            usuario: this.nombre
        })
    } else {
        res.redirect('http://localhost:8080/error')
    };
})

router.get('/', function(req, res, ) {
    if (req.session.username) {
        res.render('index', {
            active: 'index',
            usuario: req.session.username
        })
    } else {
        res.redirect('http://localhost:8080/login')
    }
});



router.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (!err) {
            res.render('adios', {
                active: 'adios',
                usuario: this.nombre
            })
        } else {
            res.json({ status: 'Logout ERROR', body: err })
        }
    })
})

module.exports = router;
