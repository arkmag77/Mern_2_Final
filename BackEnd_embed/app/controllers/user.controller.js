const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

function userAdd(data, cb) {

    let newUser = new User (data);
    
       newUser.save(function(err, user){

        if(err) {
            cb(err);
        } else {
            cb(null, user);
        }
 
        });
}


function userLogin(data, cb) {
    User.findOne({username: data.username}).exec(function(err, user){
        if(err) {
            cb(err);
            return;
        }
 
        if(!user){
            cb(null, user);
            return;
        }
 
 
        bcrypt.compare(data.password, user.password, function(err, logged) {
            if (err) {
                cb(err);
            } if (logged) {
                const token = user.generateAuthToken();
                cb(null, token);
            } else {
                cb(null, null);
            }
        })
    })
}

function userLogout(data, cb) {
    const authHeader = data.headers["x-auth-token"];
    jwt.sign(authHeader, "", { expiresIn: 1 }, (logout, err) => {
        if (logout) {
          cb(null);
        } else {
          cb(err)
        }
      });
}

module.exports = {
    add: userAdd,
    login: userLogin,
    logout: userLogout
}

