const assert = require('assert');
const User = require('../src/user');

describe('Updating records', () => {
  let joe;

  beforeEach(done => {
    joe = new User({ name: 'Joe' });
    joe.save().then(() => done());
  });

  // DRY up code with a reusable assertion
  function assertName(operation, done) {
    operation
      /* Check that there's not a record with Joe, & also that there's a record with Alex.
    Check amount of all users--array--that it's only one, & that the name is correct */
      .then(() => User.find({}))
      .then(users => {
        assert(users.length === 1);
        assert(users[0].name === 'Alex');
        done();
      });
  }

  it('should use instance type set n save', done => {
    // set and save is more for incremental updating
    // Update the name property on joe to Alex
    joe.set('name', 'Alex');
    // Now persist the change to the DB using the custom helper function, & make sure to pass done as 2nd arg
    assertName(joe.save(), done);
  });

  it('should use a model instance to update', done => {
    // update is more for bulk updates
    assertName(joe.update({ name: 'Alex' }), done);
  });

  it('should use a model class to update', done => {
    assertName(User.update({ name: 'Joe' }, { name: 'Alex' }), done);
  });

  it('should use a model class to update one record', done => {
    // Common use case in web dev is updating an individual users records
    assertName(User.findOneAndUpdate({ name: 'Joe' }, { name: 'Alex' }), done);
  });

  it('should use a model class to update by finding a record by Id', done => {
    assertName(User.findByIdAndUpdate(joe._id, { name: 'Alex' }), done);
  });
});
