const mongoose = require('mongoose');
const assert = require('assert');
// The 3 models/collections
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('Associations', () => {
  let joe, blogPost, comment;

  beforeEach(done => {
    joe = new User({ name: 'Joe' });
    blogPost = new BlogPost({
      title: 'JS is Great',
      content: 'Yup, it really is'
    });
    comment = new Comment({ content: 'Congrats on great post' });

    // Create association that "joe" authored this "blogPost" by pushing in the model,
    joe.blogPosts.push(blogPost);
    // & associate this "comment" model with this "blogPost",
    blogPost.comments.push(comment);
    // & that the comment is from "joe"
    comment.user = joe;

    // Take array of promises and combine them all into one promise
    Promise.all([joe.save(), blogPost.save(), comment.save()])
      // Only once all 3 save attampts have been completed call done
      .then(() => done());
  });

  it('should save a relation between a user & a blogpost', done => {
    // Formulate the query
    User.findOne({ name: 'Joe' })
      /* Add on a modifier to resolve the 'blogPosts' relationship
      by passing it a string--"blogPosts" is the property on User model */
      .populate('blogPosts')
      // Execute the query
      .then(user => {
        assert(user.blogPosts[0].title === 'JS is Great');
        done();
      });
  });

  it('should save a full relation graph', done => {
    User.findOne({ name: 'Joe' })
      // populate query modifier not only can be passed a string key, but a config object
      .populate({
        // recursively load--inside of the user you want to fetch--an additional resource
        path: 'blogPosts',
        // & inside of the path, go further inside to load yet another additional association
        populate: {
          path: 'comments',
          model: 'Comment',
          populate: {
            path: 'user',
            model: 'User'
          }
        }
      })
      .then(user => {
        assert(user.name === 'Joe');
        assert(user.blogPosts[0].title === 'JS is Great');
        assert(
          user.blogPosts[0].comments[0].content === 'Congrats on great post'
        );
        assert(user.blogPosts[0].comments[0].user.name === 'Joe');
        done();
      });
  });
});
