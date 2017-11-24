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
  likes: Number,
  // blogPosts on the other hand, are in their own collection
  blogPosts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'BlogPost'
    }
  ]
});
/* Instead of "postCount: Number," defined in the UserSchema to be saved on the DB,
figure out on the fly what the postCount should be by defining a virtual type/property as a separate declaration.
NOTE: function keyword used to define ES6 getter/setter to have access to the current instance with "this". */
UserSchema.virtual('postCount').get(function() {
  return this.posts.length;
});

/* User is essentially the root collection, in this app we don't want a user's comments or blog posts after a user
 deletes his account, so we use middleware--i.e. pre/post hooks--to do cleanup. Pre/post hooks can take place
 before/after 4 different Mongoose events: init, validate, save, & remove. */
UserSchema.pre('remove', function(next) {
  /* Instead of requiring in BlogPost at the top of the file--creating a cyclical load between User & BlogPost,
  pull another model out of mongoose that has already been registered by using the same mongoose.model helper */
  const BlogPost = mongoose.model('BlogPost');
  /* blogPosts is an array of Ids, instead of iterating over an array of records & issuing an update for each record,
  use the query operator "$in"
  NOTE: "this" === joe */
  BlogPost.remove({ _id: { $in: this.blogPosts } })
    /* Since this middleware is async & we want to make sure the entire middleware gets executed before removing user,
    call "next" when done to move to the next middleware or finally remove user. */
    .then(() => next());
});

// Create a collection & pass it the name "User", then pass it the schema from above
// NOTE: the variable User represents an entire collection of data
const User = mongoose.model('User', UserSchema);

module.exports = User;
