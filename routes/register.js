const router = require('express').Router();
const path = require('path');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../model/user');
const regEx = '^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})';
const publicPath = path.join(__dirname, '../public');

router.get('/', (req, res) => {
    if (process.env.ONLINE_APP) {
        res.sendFile('index.html', { root: publicPath });
    } else {
        res.redirect('/dashboard');
    }
});

router.post('/', (req, res) => {
    if (req.body.username.length < 3) {
        res.status(200).json({
            errorMessage: 'Username must be atleast 3 characters long.',
            errorName: true
        });
    } else if (!validator.isEmail(req.body.email)) {
        res.status(200).json({
            errorMessage: 'Not a valid email.',
            error: true
        });
    } else if (!validator.matches(req.body.password, regEx)) {
        res.status(200).json({
            errorMessage: 'Password should be 6 characters long and should include atleast one uppercase letter or numeric character.',
            errorPassword: true
        });
    } else if (req.body.password !== req.body.confirmPassword) {
        res.status(200).json({
            errorMessage: 'Both passwords should match.',
            errorConfirmPassword: true
        });
    } else {
        User.findOne({ email: req.body.email }).then(result => {
            if (result) {
                res.status(200).json({
                    errorMessage: 'User already exist.',
                    errorEmail: true
                });
            } else {
                let userObj = {
                    email: req.body.email,
                    username: req.body.username,
                    password: req.body.password
                };
                bcrypt.genSalt(10, (err, salt) => {
                    if (err) {
                        res.status(200).json({
                            error: 'Something went wrong while generating salt.'
                        });
                    } else {
                        bcrypt.hash(req.body.password, salt, (err, hash) => {
                            if (err) {
                                res.status(200).json({
                                    error: 'Something went wrong while hashing the password.'
                                })
                            } else {
                                userObj.password = hash;
                                new User(userObj).save().then(result => {
                                    let newUser = {
                                        id: result.id,
                                        loggedIn: true
                                    }
                                    let jwtToken = jwt.sign(newUser, process.env.JWT_KEY, { expiresIn: '1h' })
                                    res.status(200).json({
                                        successMessage: 'User created successfully.',
                                        token: jwtToken
                                    });
                                }).catch(error => {
                                    res.status(200).json({
                                        error: 'Something went wrong while saving user in database.',
                                    });
                                });
                            }
                        });
                    }
                });
            }
        });
    }
});

module.exports = router;