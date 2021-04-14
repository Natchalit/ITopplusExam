const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema({
  fname: {
    type: String
  },
  lname: {
    type: String
  },
  age: {
    type: Number
  },
  address: {
    type: String
  }, 
  career: {
    type: String
  }

}, {
  collection: 'users'
})

module.exports = mongoose.model('User', User);
