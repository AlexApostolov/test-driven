// Use included with Node assert function to make assertions without any dependencies
const assert = require('assert');
// Get access to the User model
const User = require('../src/user');

describe('Creating records', () => {
  it('saves a user', done => {
    const joe = new User({ name: 'Joe' });

    joe.save().then(() => {
      /* Has joe been saved successfully? Check if property of joe .isNew === false,
        if it's true then the model instance is only in memory & hasn't been saved yet */
      assert(!joe.isNew);
      done();
    });
  });
});
