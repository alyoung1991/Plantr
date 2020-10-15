module.exports = {
    // only show landing page to logged in users
    ensureAuth: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        else {
            res.redirect('/');
        }
    },
    // only show login page to users not logged in
    ensureGuest: function (req, res, next) {
        if (req.isAuthenticated()) {
            res.redirect('/landing');
        }
        else {
            return next();
        }
    }
}