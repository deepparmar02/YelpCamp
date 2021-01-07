const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.get('/', (req, res) => {
    res.render('auth/register');
})

router.post('/', async (req, res) => {
    res.send('registered')
})



module.exports = router;