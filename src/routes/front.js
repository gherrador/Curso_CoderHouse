const express = require('express');
const router = express.Router();
const path = require('path');



router.get('/error', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public', 'error.html'));
})

router.get('/borrar', (req, res) => {
    res.render('borrar', {
        active: 'borrar',

    })
})

router.get('/actualizar', (req, res) => {
    res.render('actualizar-producto', {
        active: 'actualizar-producto',

    })
})



module.exports = router;