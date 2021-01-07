const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/user');
const catchAsync = require('../Utils/catchAsync');

router.get('/register', (req, res) => {
    res.render('auth/register');
})

router.post('/register', catchAsync(async (req, res) => {
    try {
        const { email, username, password } = req.body
        const user = new User({
            username, email
        })
        const registeredUser = await User.register(user, password);
        res.redirect('/campground');
    }
    catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
}));

router.get('/login', (req, res) => {
    res.render('auth/login');
})

router.post('/login', passport.authenticate('local', {
    failureFlash: true,
    successFlash: 'Welcome back',
    failureRedirect: '/login',
    successRedirect: '/campground'
}), (req, res) => {

})

router.get('/logout', (req, res) => {
    req.logOut();
    req.flash('success', 'Successfully logged out');
    res.redirect('/campground');
})


module.exports = router;