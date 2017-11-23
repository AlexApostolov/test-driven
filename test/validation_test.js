const assert = require('assert');
const User = require('../src/user');

describe('Validating records', () => {
  /* Once a record/model is marked as being invalid--inside of mongoose--
  it should not be able to be saved in the DB */
  it('should require a user name', () => {
    // NOTE: passing User undefined is more explicit to engineers than an empty object
    const user = new User({ name: undefined });
    /* Do not save the model, but call the validateSync function on it that will return an object
    with all the results of validating the user model */
    const validationResult = user.validateSync();
    // The returned error message with the schema text we created, is deeply nested
    const { message } = validationResult.errors.name;

    assert(message === 'Name is required.');
  });

  it("should require a user's name to be longer than 2 characters", () => {
    const user = new User({ name: 'Al' });
    const validationResult = user.validateSync();
    const { message } = validationResult.errors.name;

    assert(message === 'Name must be longer than 2 characters.');
  });

  it('should disallow invalid records from being saved', done => {
    const user = new User({ name: 'Al' });
    user.save().catch(validationResult => {
      const { message } = validationResult.errors.name;

      assert(message === 'Name must be longer than 2 characters.');
      done();
    });
  });
});
