const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
  title: String,
  content: String,
  /* A blog post will have many comments with it.
  Create a comments array with a config object that will become an array of Ids. */
  comments: [
    {
      // "type" will point off to a record sitting in a different collection
      type: Schema.Types.ObjectId,
      // "ref" tells what collection it needs to look at, e.g. populate using the Comment model
      ref: 'Comment'
    }
  ]
});

// Register BlogPost model
const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

module.exports = BlogPost;
