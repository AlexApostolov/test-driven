const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('Middleware', () => {
  let joe, blogPost;

  beforeEach(done => {
    joe = new User({ name: 'Joe' });
    blogPost = new BlogPost({
      title: 'JS is Great',
      content: 'Yup, it really is'
    });

    // Create association that "joe" authored this "blogPost" by pushing in the model,
    joe.blogPosts.push(blogPost);

    // Take array of promises and combine them all into one promise
    Promise.all([joe.save(), blogPost.save()])
      // Only once all 3 save attampts have been completed call done
      .then(() => done());
  });

  it("should clean up user's dangling blogposts on remove", done => {
    joe
      .remove()
      .then(() => BlogPost.count())
      .then(count => {
        assert(count === 0);
        done();
      });
  });
});
