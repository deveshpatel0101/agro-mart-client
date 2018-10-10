const router = require('express').Router();
const jwt = require('jsonwebtoken');
const path = require('path');

const Shared = require('../model/shared');
const User = require('../model/user');
const publicPath = path.join(__dirname, '../public');

router.get('/shared', (req, res) => {
    if (process.env.ONLINE_APP) {
        res.sendFile('index.html', { root: publicPath });
    } else {
        res.send('you are on /public/shared route');
    }
});

router.post('/shared', (req, res) => {
    jwt.verify(req.headers.authorization.split(' ')[1], process.env.JWT_KEY, (err, decoded) => {
        if (err) {
            return res.status(200).json({
                error: 'invalid token',
                tokenStatus: 'invalid'
            });
        } else {
            User.findById(decoded.id).then(userResult => {
                if (userResult) {
                    let finalBlogsArr = userResult.blogs.map(blog => blog.id === req.body.blogId ? {...blog, shared: req.body.shared } : blog);
                    User.findOneAndUpdate({ _id: decoded.id }, {
                        $set: {
                            blogs: finalBlogsArr
                        }
                    }).then(finalResult => {
                        if (finalResult) {
                            if (!req.body.shared) {
                                Shared.findOneAndRemove({ blogId: req.body.blogId }).then(deleteBlogResult => {
                                    if (deleteBlogResult) {
                                        return res.status(200).json({
                                            message: 'successful delete',
                                            result: deleteBlogResult
                                        });
                                    }
                                }).catch(err => {
                                    console.log(err);
                                    return res.status(200).json({
                                        error: 'Something went wrong while deleting blog from shared from db'
                                    });
                                });
                            } else {
                                let sharedBlog = new Shared({...req.body });
                                sharedBlog.save().then(sharedResult => {
                                    if (sharedResult) {
                                        return res.status(200).json({
                                            message: 'successful',
                                            result: sharedResult
                                        });
                                    }
                                }).catch(err => {
                                    return res.status(200).json({
                                        error: 'Something went wrong while saving new shared blog in db',
                                    });
                                });
                            }
                        } else {
                            return res.status(200).json({
                                error: 'user does not exist'
                            });
                        }
                    });
                } else {
                    return res.status(200).json({
                        error: 'user does not exist'
                    });
                }
            }).catch(err => {
                return res.status(200).json({
                    error: 'Something went wrong while finding user from db'
                });
            });
        }
    });
});


router.get('/shared/blog', (req, res) => {
    if (req.query.id) {
        Shared.findOne({ blogId: req.query.id }).then(result => {
            if (result) {
                return res.status(200).json({
                    message: 'successful',
                    blog: result
                });
            } else {
                return res.status(200).json({
                    message: 'unsuccessful',
                    error: 'does not exist'
                });
            }
        });
    } else {
        return res.status(200).json({
            message: 'invalid query',
            error: 'no id found in query'
        });
    }
});

module.exports = router;