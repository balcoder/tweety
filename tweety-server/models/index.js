const {USER, PASSWORD} = require('../tweety.config.js')

const mongoose = require('mongoose');
mongoose.set('debug', true);
mongoose.Promise = Promise;
mongoose.connect(`mongodb://${USER}:${PASSWORD}@ds135817.mlab.com:35817/tweety`, {
  keepAlive: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
})

//grab the model from ./user.js and export as User
module.exports.User = require('./user');
module.exports.Message = require('./message');