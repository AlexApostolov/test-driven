const mongoose = require('mongoose');
// Use ES6 promise implementation
mongoose.Promise = global.Promise;

// Add a hook to be run only once before the entire test suite
before(done => {
  mongoose
    .connect('mongodb://localhost/users_test', {
      useMongoClient: true
    })
    .then(db => {
      done();
    })
    .catch(error => console.log('Warning', error));
});

// Add a hook to the collection of users sitting inside the DB & delete them
beforeEach(done => {
  mongoose.connection.collections.users.drop(() => {
    // Ready to run the next test!
    done();
  });
});
