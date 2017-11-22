const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String
});

// Create a collection & pass it the name "User", then pass it the schema from above
// NOTE: the variable User represents an entire collection of data
const User = mongoose.model('User', UserSchema);

module.exports = User;
