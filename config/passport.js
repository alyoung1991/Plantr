const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

// create google strategy with passport
module.exports = function(passport) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
        console.log(profile);

        const userData = {
            googleId: profile.id,
            displayName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            image: profile.photos[0].value
        };

        try {
            done(null, userData);
        } catch (err) {
            done(null, userData);
            console.error(err);
        }
    }))

    // support sessions with cookie serialization
    passport.serializeUser(function(user, done) {
        done(null, user);
    });
    
    passport.deserializeUser(function(user, done) {
        done(null, user);
        // TODO - add user data to database?
        // User.findById(id, function(err, user) {
        //     done(err, user);
        // });
    });
}