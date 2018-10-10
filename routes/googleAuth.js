const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.get('/', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

router.get('/callback', passport.authenticate('google'), (req, res) => {
    const jwtPayload = {
        id: req.user.id,
        loggedIn: true
    }
    const jwtToken = jwt.sign(jwtPayload, process.env.JWT_KEY, { expiresIn: '1h' });
    res.cookie('loginToken', jwtToken);
    res.redirect('/dashboard');
});

module.exports = router;