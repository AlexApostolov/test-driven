const assert = require('assert');
const User = require('../src/user');

describe('Virtual types', () => {
  it('should return number of posts with postCount', done => {
    const joe = new User({
      name: 'Joe',
      posts: [{ title: 'PostTitle' }]
    });

    /* Use Mongoose's Virtual Types/Properties--any field on a model that does not get persisted over on the MongoDB database--for postCount on your server rather than storing both a "posts" & "postCount" property on the DB. A derivative/tightly coupled property of another property, like postCount is to posts, is a perfect use case.  */
    joe
      .save()
      .then(() => User.findOne({ name: 'Joe' }))
      .then(user => {
        assert(joe.postCount === 1);
        done();
      });
  });
});
