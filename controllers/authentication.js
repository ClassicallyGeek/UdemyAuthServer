const jwt = require('jwt-simple');

const config = require('../config');
const User = require('../models/user');

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  //sub = subject "who is this token about?"
  //iat = issued at time
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signup = function(req, res, next) {
  // Anything contained in the post request.
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send({error: 'You must provide email and password'});
  }
  // See if a user with the given email exists
  User.findOne({ email }, (err, existingUser) => {
    if ( err ) { return next(err); }
    // If user with email does exist, return an error.
    if (existingUser) {
      return res.status(422).send({error: 'Email is in use'}); // unprocessable entity
    }
    // If a user with email does NOT exist, create and save user record.
    const user = new User({ email, password });

    // save record to db save() takes callback.
    user.save((err) => {
      if (err) { return next(err); }
      // Send back a token that can be used.
      res.json({ token: tokenForUser(user) });
    });
  });
}

exports.signin = function(req, res, next) {
  // User has already has their email and password authenticated
  // Give them a token
  const user = req.user; // this comes from the localstrategy done callback- it returns user.
  res.send({token: tokenForUser(user)});
}
