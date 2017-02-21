var jwt = require('jwt-simple');
// jwt creates a three part token separated by periods. First contains base64(hashing-alg-info). Second is base64(payload). third is base64(hashed(hashing-alg-info + . + payload) 
var validateUser = require('../routes/auth').validateUser;
 
module.exports = function(req, res, next) {
 
  // When performing a cross domain request, you will recieve
  // a preflighted request first. This is to check if our the app
  // is safe. 
 
  // We skip the token outh for [OPTIONS] requests.
  //if(req.method == 'OPTIONS') next();
 
  var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
 
  if (token) {
    try {
      var decoded = jwt.decode(token, require('../config/secret.js')());
 
      if (decoded.exp <= Date.now()) {
        res.status(400);
        res.json({
          "status": 400,
          "message": "Token Expired."
        });
        return;
      }
 
      // Authorize the user to see if user can access our resources
      var dbUser = validateUser(decoded.user.name);
      if (dbUser) {
        // the token is correct and a user could be found with this name.
 
        // if the requested url contains 'admin' and I have role admin, or the url does not contain 'admin' but does contain /api/v1
        if ((req.url.indexOf('admin') >= 0 && dbUser.role == 'admin') || (req.url.indexOf('admin') < 0 && req.url.indexOf('/api/v1/') >= 0)) {
          next(); // To move to next middleware
        } else {
          res.status(403);
          res.json({
            "status": 403,
            "message": "Not Authorized."
          });
          return;
        }
      } else {
        // username does not exist, respond back with a 401
        res.status(401);
        res.json({
          "status": 401,
          "message": "Invalid User."
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
  } else {
    res.status(401);
    res.json({
      "status": 401,
      "message": "Invalid or missing Token."
    });
    return;
  }
};