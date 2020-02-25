const db = require('../models'); //User model from index.js
const jwt = require('jsonwebtoken');  //keep user logged in (jwt.io)

exports.signin = async function (req, res, next) {
  try {
    //find the user, check password match, log them in with token
    let user = await db.User.findOne({
      email: req.body.email
    });
    let { id, username, profileImageUrl } = user;
    // check if password matches
    let isMatch = await user.comparePassword(req.body.password);
    if(isMatch) {
      let token = jwt.sign({
        id,
        username,
        profileImageUrl
      },
      process.env.SECRET_KEY
      );
      return res.status(200).json({
        id, 
        username,
        profileImageUrl,
        token    
      });
    } else {
      return next({
        status: 400,
        message: 'Invalid email/password'
      })
    }
  } catch (err) {
    return next({
      status: 400,
      message: 'Invalid email/password'
    })
  }
  
}


exports.signup = async function(req, res, next) {
  try {
    //create user , create token, process.env.secret_key
    let user = await db.User.create(req.body);
    let { id, username, profileImageUrl } = user;
    let token = jwt.sign({ //jwt.sign takes a payload and a secret_key
      id,
      username,
      profileImageUrl
    },
    process.env.SECRET_KEY
  );
  return res.status(200).json({
    id,
    username,
    profileImageUrl,
    token
  });
} catch (err) {
  // validation err = 11000
    if(err.code === 11000) {
      err.message = 'That username and/or email is taken. Try another.'
    }
    return next({
      status: 400,
      message: err.message
    });

  }
};
