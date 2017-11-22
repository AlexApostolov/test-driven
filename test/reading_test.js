const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {
  /* Since the test_helper.js is repeatedly dropping the collection of users
  we need to create a "joe" instance before this test. We also want the variable to be available
  to the inner scope of the "it" block, so we declare "joe" ahead of time. */
  let joe;

  beforeEach(done => {
    /* mongoose creates an id for "joe" automatically, before joe is even saved.
    We can use that id to make sure we have the correct joe. */
    joe = new User({ name: 'Joe' });
    joe.save().then(() => done());
  });

  it('should find all users with a name of joe', done => {
    // Use class function to query the DB for an array of all joes
    User.find({ name: 'Joe' }).then(users => {
      /* _id is encapsulated by ObjectId in an object, & so can't be strictly compared
      without converting to a string or using the .id virtual getter */
      assert(users[0]._id.toString() === joe._id.toString());
      done();
    });
  });

  it('should find a user with a particular id', done => {
    User.findOne({ _id: joe._id }).then(user => {
      assert(user.name === 'Joe');
      done();
    });
  });
});
