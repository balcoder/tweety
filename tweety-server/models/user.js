const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profileImageUrl: {
    type: String
  },
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Message'
  }]
});

// add a hook before we create a model to hash our PASSWORD
userSchema.pre('save', async function(next) {
  try {
    if(!this.isModified('password')) { //password has not been changed do nothing
      return next();
    }
    let hashedPassword = await bcrypt.hash(this.password, 10);
    this.password = hashedPassword;
    return next(); // goes to save middleware
    } catch (err) {
      return next(err)
    }
});
// every doc we make from this model will have the ability to compare
// hashed passed in password with hash in database

userSchema.methods.comparePassword = async function(candidatePassword, next) {
  try {
    let isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    return next(err);
  }
  // bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
  //     if (err) return next(err);
  //     next(null, isMatch);
  // });
};




module.exports = mongoose.model('User', userSchema);