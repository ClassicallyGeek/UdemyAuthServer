const passport = require('passport');
const JwtStrategy = require ('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local');

const User = require('../models/user');
const config = require('../config');

// Passport - a Strategy is a method for authenticating a user.

// Local Strategy - "Local DB" auth a user with an email & Password
const localOptions = { usernameField: 'email' }; // local is expecting a username in the request.
                                                 // We have to tell them the field is called email.
const localLogin = new LocalStrategy( localOptions, (email, password, done) => {
  // Verify username & Password
  // Call done w/user if correct username & Password
  // otherwise call done with false
});

//Setup options for JWT Strategy
const jwtOptions = {
   // we're telling jwt where to find the token because those things can live anywhere.
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  // we also need the secret to decode the token- it can't just magically be in the payload below
  secretOrKey: config.secret
};

// Create JWT Strategy
/* payload - the decoded jwt token (sub,ita)
 * done - a passport callback function we need to call depending on successful authentication of user */
const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  // See if the user id in the payload exists in our database
  User.findById(payload.sub, (err, user) => {
    if (err) { return done(err, false) }

    if (user) {
      // we found a user return no error, user
      return done(null, user);
    }
    // we couldn't find a user return no error, no user
    return done(null, false);
  });
});

// Tell passport to use this strategy.
passport.use(jwtLogin);
