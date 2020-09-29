const express = require('express');
const router = express.Router();

// @desc        Login page
// @route       GET /
router.get('/', (req, res) => {
    res.render('login', {layout: 'login'});
});

// @desc        test page
// @route       GET /test
router.get('/test', (req, res) => {
    res.render('test');
});

module.exports = router;