const express = require('express');
const router = express.Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');

// @desc        Login page
// @route       GET /
router.get('/', ensureGuest, (req, res) => {
    res.render('login', {layout: 'login'});
});

// @desc        landing page
// @route       GET /landing
router.get('/landing', ensureAuth, (req, res) => {
    console.log(req.user)
    res.render('landing');
});

module.exports = router;