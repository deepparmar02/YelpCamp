const User = require('../models/user');

module.exports.renderRegisterForm = (req, res) => {
    res.render('auth/register');
};

module.exports.register = async (req, res) => {
    try {
        const { email, username, password } = req.body
        const user = new User({
            username, email
        })
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', "Welcome to YelpCamp");
            res.redirect('/campground');
        })

    }
    catch (e) {
        req.flash('error', e.message);
        res.redirect('/register');
    }
};

module.exports.renderLogin = (req, res) => {
    res.render('auth/login');
};

module.exports.login = (req, res) => {
    const redirectUrl = req.session.returnTo || '/campground';
    delete req.session.returnTo;
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
    req.logOut();
    req.flash('success', 'Successfully logged out');
    res.redirect('/campground');
};