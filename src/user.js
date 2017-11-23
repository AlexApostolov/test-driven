const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  /* Make sure to require a string type is provided by the user,
  & provide a plain English error message to the user in case validation fails */
  name: {
    type: String,
    validate: {
      validator: name => name.length > 2,
      message: 'Name must be longer than 2 characters.'
    },
    required: [true, 'Name is required.']
  },
  postCount: Number
});

// Create a collection & pass it the name "User", then pass it the schema from above
// NOTE: the variable User represents an entire collection of data
const User = mongoose.model('User', UserSchema);

module.exports = User;
