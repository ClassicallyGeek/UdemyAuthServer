module.exports = function(app) {
  /*
  * req - request
  * res - response we'll form up and send back
  * next - mostly for error handling.
  */
  app.get('/', function(req, res, next) {
    res.send(['hello','world']);
  });
}
