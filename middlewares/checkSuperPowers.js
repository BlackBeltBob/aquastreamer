var jwt = require('jwt-simple');
var hasSuperPowers = require('../routes/auth').hasSuperPowers;


module.exports = function(req, res, next) {

  var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];

  if (token) {
    try {
      var decoded = jwt.decode(token, require('../config/secret.js')());
      var su = hasSuperPowers(decoded.user.name);
      if (su) {
      	next();
      } else {
          res.status(403);
          res.json({
            "status": 403,
            "message": "Not Authorized."
          });
        return;
      }
  	} catch (err) {
      res.status(500);
      res.json({
        "status": 500,
        "message": "Internal Server Error",
       "error": err
      });
    }
  }
};