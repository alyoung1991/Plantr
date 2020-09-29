const express = require('express');
const passport = require('passport');
const router = express.Router();

// @desc        authenticate via Google
// @route       GET /auth/google
router.get('/google', passport.authenticate('google', {scope: ['profile']}));

// @desc        auth callback
// @route       GET /auth/google/callback
router.get('/google/callback', 
    passport.authenticate('google',
    // failure redirects to index page
    {fauilureRedirect: '/'}), 
    // success redirects to landing page
    (req, res) => {
        res.redirect('/landing');
    }
);

module.exports = router;