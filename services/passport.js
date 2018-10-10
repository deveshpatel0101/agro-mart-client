const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../model/user');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((result) => {
        done(null, result);
    });
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
    proxy: true
}, (accessToken, refreshToken, profile, done) => {
    const userObj = new User({
        username: profile.displayName,
        email: profile.emails[0].value,
        profileImage: profile.photos[0].value,
        accountType: 'google',
        accessToken,
        refreshToken,
    });
    User.findOne({ email: userObj.email }).then((result01) => {
        if (result01) {
            done(null, result01);
        } else {
            userObj.save().then((result) => {
                done(null, result);
            }).catch(err => {
                console.log('something went wrong while saving user in datbase.', err);
            });
        }
    }).catch(err => {
        console.log('Something went wrong while fetching data from db.', err);
    });
}));