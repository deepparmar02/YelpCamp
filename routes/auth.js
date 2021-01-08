const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/user');
const catchAsync = require('../Utils/catchAsync');
const auth = require('../controllers/auth');

router.route('/register')
    .get(auth.renderRegisterForm)
    .post(catchAsync(auth.register))

router.route('/login')
    .get(auth.renderLogin)
    .post(passport.authenticate('local', {
        failureFlash: true,
        successFlash: 'Welcome back',
        failureRedirect: '/login',
    }), auth.login);

router.get('/logout', auth.logout);

module.exports = router;