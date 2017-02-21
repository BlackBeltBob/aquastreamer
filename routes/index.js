var express = require('express');
var router = express.Router();

var about = require('./about.js');
var auth = require('./auth.js');
var products = require('./products.js');
var user = require('./users.js');

////////////////////////////////////////////////////////////////////
// Routes that can be accessed by anyone
router.get('/version', about.info);
router.post('/login', auth.login);


////////////////////////////////////////////////////////////////////
// Routes that can be accessed only by autheticated users
router.get('/api/v1/products', products.getAll);
router.get('/api/v1/product/:id', products.getOne);
router.post('/api/v1/product/', products.create);
router.put('/api/v1/product/:id', products.update);
router.delete('/api/v1/product/:id', products.delete);


// /api/v1/volume
// /api/v1/mute
// /api/v1/treble
// /api/v1/mid
// /api/v1/bass


////////////////////////////////////////////////////////////////////
// Routes that can be accessed only by authenticated & authorized users
// /api/v1/admin/users     (getAll, update, delete) (GET, POST, DELETE)
// /api/v1/admin/users/1   (getOne) (GET)

router.get('/api/v1/users', user.getAll);
router.get('/api/v1/user/:id', user.getOne);
router.post('/api/v1/user/', user.create);
router.put('/api/v1/user/:id', user.update);
router.delete('/api/v1/user/:id', user.delete);

module.exports = router;