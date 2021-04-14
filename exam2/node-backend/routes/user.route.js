const express = require('express');
const app = express();

const userRoute = express.Router();
let User = require('../models/User');

//add user 
userRoute.route('/add-user').post((req, res, next) => {
  User.create(req.body, (err, data) => {
    if (err) {
      return next(err);
    } else {
      res.json(data);
    }
  })
})

//get all users
userRoute.route('/').get((req, res) => {
  User.find((err, data) => {
    if (err) {
      return next(err);
    } else {
      res.json(data);
    }
  })
})

//get user
userRoute.route('/edit-user/:id').get((req, res) => {
  User.findById(req.params.id, (err, data) => {
    if (err) {
      return next(err);
    } else {
      res.json(data);
    }
  })
})

//update user
userRoute.route('/update-user/:id').put((req, res, next) => {
  User.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (err, data) => {
    if (err) {
      return next(err);
      console.log(err);
    } else {
      res.json(data)
      console.log('User Updated Success!');
    }
  })
})

//delete user
userRoute.route('/delete-user/:id').delete((req, res, next) => {
  User.findByIdAndRemove(req.params.id, (err, data) => {
    if (err) {
      return next(err);
    } else {
      res.status(200).json({
          msg: data
      });
    }
  })
})

module.exports = userRoute;