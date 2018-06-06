const bcrypt = require('bcrypt-nodejs');
const mongoose = require('mongoose');
const Schema = mongoose.Schema; // Schema is what we use to tell mongoose what fields our model will have.

// Define our model
const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  password: String
});

// On save hook, encrypt password
// before save run this function
userSchema.pre('save', function(next) {
  // the context of the function is the user model.
  const user = this;

  // generate a salt - randomly generated string of chars.
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }

    // Hash/encrypt password using the salt - takes callback
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) { return next(err) }
      // overwrite plain text password w/encrypted password.
      user.password = hash; // salt + plain text => salt + hashed password
      // next means save the model.
      next();
    });
  })
});

// Methods object says whenever we make a user object it should have access to functions on method property
userSchema.methods.comparePassword = function(candidatePassword, callback) {
  // bcrypt will compare the passwords for us and let us know how it went.
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    if (err) { return callback(err); }

    callback(null, isMatch);
  })
}

// Create the model class
const ModelClass = mongoose.model('user', userSchema);

// Export the model so other files in our application can use it.
module.exports = ModelClass;
