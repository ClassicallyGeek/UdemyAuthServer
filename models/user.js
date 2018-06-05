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

// Create the model class
const ModelClass = mongoose.model('user', userSchema);

// Export the model so other files in our application can use it.
module.exports = ModelClass;
