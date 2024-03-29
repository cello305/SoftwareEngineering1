const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { ensureAuthenticated } = require('../config/auth');

//User model
const User = require('../models/User');

//Login Page
router.get('/login', (req, res) => res.render('login'));

//Register Page
router.get('/register', (req, res) => res.render('register'));


//Register Handle
router.post('/register', (req, res) => {
    const { name, email, password, password2, address, cc1, cc2, cc3 } = req.body;
    let errors = [];

    //Check form submissions
    if(!email || !password || !password2) {
        errors.push({ msg: 'Please fill in all fields'})
    }

    //Check password match
    if(password !== password2){
        errors.push({ msg: 'Passwords do not match'});
    }

    //Check password length
    if(password.length < 6) {
        errors.push({ msg: 'Password should be at least 6 characters'});
    }

    if(errors.length > 0) {
        res.render('register', {
        errors,
        name,
        email,
        password,
        password2,
        cc1,
        cc2,
        cc3
    });
    }else {
        // Validate user
        User.findOne({ email: email })
        .then(user => {
            if(user) {
                //User exists
                errors.push({ msg: 'Email is already registered'});
                res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    password2,
                    cc1,
                    cc2,
                    cc3
            });
        } else {
            const newUser = new User({
                name,
                email,
                password,
                password2,
                address,
                cc1,
                cc2,
                cc3
            });
            newUser.save()
          .then(user => {
            res.redirect('/users/login');
          })
          .catch(err => console.log(err));
            }
          });

          
        }
      });

      //Login handle
      router.post('/login', (req, res, next) => {
        passport.authenticate('local', {
          successRedirect: '/dashboard',
          failureRedirect: '/users/login',
          failureFlash: true
        })(req, res, next);
      });
      
     // Logout handle
router.get('/logout', (req, res) => {
  req.logout(function(err) {
  if (err) { return next(err); }
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});
});
      
module.exports = router;