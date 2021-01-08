const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/user');
const catchAsync = require('../Utils/catchAsync');
const auth = require('../controllers/auth');

router.get('/register', auth.renderRegisterForm);

router.post('/register', catchAsync(auth.register));

router.get('/login', auth.renderLogin);

router.post('/login', passport.authenticate('local', {
    failureFlash: true,
    successFlash: 'Welcome back',
    failureRedirect: '/login',
}), auth.login);

router.get('/logout', auth.logout);

module.exports = router;