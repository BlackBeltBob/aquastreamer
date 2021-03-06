var jwt = require('jwt-simple'); // javascript web token

var auth = {
 
  login: function(req, res) {
 
    var username = req.body.username || '';
    var password = req.body.password || '';
 
    // if username and/or password are not supplied:
    if (username == '' || password == '') {
      res.status(401);
      res.json({
        "status": 401,
        "message": "Invalid credentials - username and/or password not submitted." + JSON.stringify(req.body)
      });
      return;
    }
 
    // Fire a query to your DB and check if the credentials are valid
    var dbUserObj = auth.validate(username, password);
   
    if (!dbUserObj) { // If authentication fails, we send a 401 back
      res.status(401);
      res.json({
        "status": 401,
        "message": "Invalid credentials."
      });
      return;
    }
    else {
 
      // If authentication is success, we will generate a token and dispatch it to the client.
      res.json(genToken(dbUserObj));
    }
  },

  // function used within this file to check if user exists. returns info of user.
  validate: function(username, password) {
    // spoofing the DB response for simplicity
    var dbUserObj = { // spoofing a userobject from the DB. 
      name: 'arvind',
      role: 'admin',
      username: 'arvind@myapp.com'
    };
    return dbUserObj;
  },

  // function used outside this file to check if user exists.
  validateUser: function(username) {
    // spoofing the DB response for simplicity
    var dbUserObj = { // spoofing a userobject from the DB. 
      name: 'arvind',
      role: 'admin',
      username: 'arvind@myapp.com'
    };
 
    return dbUserObj;
  },

  hasSuperPowers: function(username) {
    console.log('checking user for super powers');
    // spoofing the DB response for simplicity
    var dbUserObj = auth.validateUser(username);
    if (!dbUserObj) return;
    if (dbUserObj.role != 'admin') return;
    
    console.log('user ' + username + ' has super powers');

    return dbUserObj;
  },
}
 
// private method
function genToken(user) {
  var expires = expiresIn(1); // 1 day
  var token = jwt.encode({
    exp: expires,
    user: user,
  }, require('../config/secret')());
 
  return {
    token: token,
    expires: expires,
    user: user
  };
}
 
function expiresIn(numDays) {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}
 
module.exports = auth;