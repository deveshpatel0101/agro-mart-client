const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const mongoose = require('./db/mongoose');
const passportConfig = require('./services/passport');
const blog = require('./routes/blogs');
const shared = require('./routes/shared');
const login = require('./routes/login')
const register = require('./routes/register');
const verify = require('./routes/verify');
const googleAuth = require('./routes/googleAuth');

const app = express();
const publicPath = path.join(__dirname, './public');
const port = process.env.PORT || 5000;

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [process.env.COOKIE_KEY]
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(publicPath));

app.use('/auth/google', googleAuth);

app.use('/user/blogs', blog);

app.use('/public/', shared);

app.use('/user/login', login);

app.use('/user/register', register);

app.use('/user/verify', verify);

app.get('/dashboard', (req, res) => {
    res.sendFile('index.html', { root: publicPath });
});

app.get('/create', (req, res) => {
    res.sendFile('index.html', { root: publicPath });
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});