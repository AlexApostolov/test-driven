const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* Every post has a user author. Since we are not creating a separate Post collection,
we do not need a Post model--only a Post schema. Post will be embedded in the User model, i.e. subdocument. */
const PostSchema = new Schema({
  title: String
});

module.exports = PostSchema;
