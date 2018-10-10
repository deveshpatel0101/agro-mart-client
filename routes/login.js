const router = require('express').Router();
const path = require('path');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const User = require('../model/user');
const publicPath = path.join(__dirname, '../public');

router.get('/', (req, res) => {
    if(process.env.ONLINE_APP) {
        res.sendFile('index.html', { root: publicPath });
    } else {
        res.redirect('/dashboard');
    }
});

router.post('/', (req, res) => {
    if (!validator.isEmail(req.body.email)) {
        return res.status(200).json({
            error: 'not a valid email'
        });
    } else {
        User.findOne({ email: req.body.email }).then(result => {
            if (!result) {
                return res.status(200).json({
                    error: 'user does not exist'
                });
            } else {
                bcrypt.compare(req.body.password, result.password, (err, isPasswordCorrect) => {
                    if (err) {
                        return res.status(200).json({
                            error: 'something went wrong while comparing the password'
                        });
                    } else if (!isPasswordCorrect) {
                        return res.status(200).json({
                            error: 'wrong password'
                        });
                    } else {
                        const jwtPayload = {
                            id: result.id,
                            logged: true
                        }
                        req.session.user = jwtPayload;
                        let token = jwt.sign(jwtPayload, process.env.JWT_KEY, { expiresIn: '1h' });
                        return res.status(200).json({
                            message: 'logged in',
                            token: token
                        });
                    }
                });
            }
        }).catch(err => {
            return res.status(200).json({
                error: 'Something went wrong while fetching user.',
                errorMessage: err
            });
        });
    }
});

module.exports = router;