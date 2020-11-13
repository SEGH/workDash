const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("../models");

// Authentication strategy to use username and password for login
passport.use(new LocalStrategy(
    function(username, password, done) {
        db.User.findOne({ username: username }, function(err, user) {
            if (err) { return done(err); }
            if (!user) {
                return done(null, false, { message: "Incorrect username." });
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: "Incorrect password." });
            }

            return done(null, user);
        });
    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (id, done) {
    db.User.findById(id, function(err, user) {
        done(err, user);
    });
});

module.exports = passport;