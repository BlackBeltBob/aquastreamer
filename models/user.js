// app/models/user.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserSchema   = new Schema({
	id: String,
    name: String,
    username: String,
    role: String
});
module.exports = mongoose.model('User', UserSchema);