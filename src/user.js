const mongoose = require('mongoose');
const PostSchema = require('./postSchema');
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
  // Wire up subdocument association for array of posts
  posts: [PostSchema],
  likes: Number
});
/* Instead of "postCount: Number," defined in the UserSchema to be saved on the DB,
figure out on the fly what the postCount should be by defining a virtual type/property as a separate declaration.
NOTE: function keyword used to define ES6 getter/setter to have access to the current instance with "this". */
UserSchema.virtual('postCount').get(function() {
  return this.posts.length;
});

// Create a collection & pass it the name "User", then pass it the schema from above
// NOTE: the variable User represents an entire collection of data
const User = mongoose.model('User', UserSchema);

module.exports = User;
