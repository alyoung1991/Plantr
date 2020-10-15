const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');
const db = require('../controllers/db');

// create google strategy with passport
module.exports = function(passport) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
        },
        async (accessToken, refreshToken, profile, done) => {
            const userData = {
                id: profile.id,
                userName: profile.displayName,
                image: profile.photos[0].value
            };
            
            try {
                insertUser(userData);
                done(null, userData);
            } catch (err) {
                done(null, userData);
                console.error(err);
            }
    }))

    // support sessions with cookie serialization
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });
    
    passport.deserializeUser(function(id, done) {
        // // TODO - add user data to database?
        // User.findById(id, function(err, user) {
        //     done(err, user);
        // });
        done(null, id);
    });

    function insertUser(user) {
        let query = "INSERT INTO users (id, username, image, created_at) " +
            "VALUES (?, ?, ?, ?);";
        let params = [
            db.escape(user.id), db.escape(user.userName), 
            db.escape(user.image), db.escape(Date.now)
        ];
        db.query(query, params, (err, res) => {
        });
    }
}