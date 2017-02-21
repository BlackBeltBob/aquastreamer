/*


// more routes for our API will happen here

// on routes that end in /users
// ----------------------------------------------------
router.route('/users')

    // create a user (accessed at POST http://localhost:8080/api/user)
    .post(function(req, res) {
        
        var user = new User();      // create a new instance of the user model
        user.name = req.body.name;  // set the users name (comes from the request)

        // save the user and check for errors
        user.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'User created!' });
        });
        
    })


    // get all the users (accessed at GET http://localhost:8080/api/users)
    .get(function(req, res) {
        User.find(function(err, users) {
            if (err)
                res.send(err);

            res.json(users);
        });
    });

router.route('/users/:user_id')

	.delete(function(req, res) {
        User.remove({
            _id: req.params.user_id
        }, function(err, user) {
            if (err) {
                res.json({ message: err});
            }

            res.json({ message: 'Successfully deleted' });
        });
    });
*/
var User     = require('../models/user');

var users = {
 
  getAll: function(req, res) {
    User.find({}, function(err, userlist) {
      if (err) res.send(err);

      res.json(userlist);
    });
  },
 
  getOne: function(req, res) {
    var id = req.params.id;
    var user = data[0]; // Spoof a DB call
    res.json(user);
  },
 
  create: function(req, res) {
    // construct a new user.
    var newuser = new User({
      name: req.body.name,
      username: req.body.username,
      password: req.body.password,
      role: ''
    });
    
    // save it.
    newuser.save(function(err) {
      if (err) throw err;
      res.json(true);
    });
  },
 
  update: function(req, res) {
    var updateuser = req.body;
    // find the user:
    var uid = req.params.id;
    User.find({ id: uid }, function(err, user) {
      if (!user) {
        console.log("geen user met id: " + uid);
        throw err;
      }
      var curruser = new User(user);
      // update the properties of user
      if (updateuser.name) curruser.name = updateuser.name;
      if (updateuser.password) curruser.password = updateuser.password;
      if (updateuser.username) curruser.username = updateuser.username;
      // save the user.
      curruser.save(function(err) {
        if (err) throw err;
        res.json(true);
      });
    });
  },
 
  delete: function(req, res) {
    var id = req.params.id;
    data.splice(id, 1) // Spoof a DB call
    res.json(true);
  }
};
 
var data = [{
  name: 'user 1',
  id: '1'
}, {
  name: 'user 2',
  id: '2'
}, {
  name: 'user 3',
  id: '3'
}];
 
module.exports = users;