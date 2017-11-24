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
  // The variable names have to be all lowercase because Mongoose normalizes each collection name
  const { users, comments, blogposts } = mongoose.connection.collections;
  users.drop(() => {
    comments.drop(() => {
      blogposts.drop(() => {
        done();
      });
    });
  });
});
