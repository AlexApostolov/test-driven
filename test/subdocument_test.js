const assert = require('assert');
const User = require('../src/user');

describe('Subdocuments', () => {
  it('should create a subdocument', done => {
    const joe = new User({
      name: 'Joe',
      posts: [{ title: 'PostTitle' }]
    });

    joe
      .save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        assert(user.posts[0].title === 'PostTitle');
        done();
      });
  });

  it('should add subdocuments to an existing record', done => {
    const joe = new User({
      name: 'Joe',
      posts: []
    });

    joe
      .save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        user.posts.push({ title: 'New Post' });
        // Save the entire record, cannot save just the subdocument
        return user.save();
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        assert(user.posts[0].title === 'New Post');
        done();
      });
  });

  it('should remove an existing subdocument', done => {
    const joe = new User({
      name: 'Joe',
      posts: [{ title: 'New Title' }]
    });

    joe
      .save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        /* Use Mongoose's "remove" method on the post instead of slicing/splicing
        through the array with vanilla JavaScript */
        user.posts[0].remove();
        // Must still save the changes when using subdocuments
        return user.save();
      })
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        assert(user.posts.length === 0);
        done();
      });
  });
});
