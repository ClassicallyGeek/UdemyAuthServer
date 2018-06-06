
const Authentication = require('./controllers/authentication');
const passportService = require('./services/passport');
const passport = require('passport');

// By default passport tries to make a cookie based session so we set that to false.
const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', {session: false});

module.exports = function(app) {
  /*
  * req - request
  * res - response we'll form up and send back
  * next - mostly for error handling.
  */
  app.get('/', requireAuth, function(req, res, next) { res.send({hi: 'there' }); });
  app.post('/signin', requireSignin, Authentication.signin);
  app.post('/signup', Authentication.signup);
}
