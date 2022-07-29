const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const mongoose = require('mongoose');
require('../models/User');
const User = mongoose.model('User');
const bcrypt = require('bcryptjs');


//Welcome page
router.get('/', (req, res) => res.render('welcome'));

//Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) => 
res.render('dashboard', {
    name: req.user.name,
    address: req.user.address,
    email: req.user.email,
    password: req.user.password
}));

//Edit profile
router.get('/edit', ensureAuthenticated, (req, res) =>
res.render('edit', {
    name: req.user.name,
    email: req.user.email,
    password: req.user.password,
    address: req.user.address
    
}));

router.post('/edit', ensureAuthenticated, (req, res) => {
    User.findOneAndUpdate({_id:req.user.id},{
        name: req.body.name, 
        address: req.body.address,
        password: req.body.password
    },
        {new: true},(err,doc)=>{
        console.log('#### Updated Record ####',doc);
        res.redirect('/dashboard');
    });
  });

//Edit profile
router.get('/cc', ensureAuthenticated, (req, res) =>
res.render('cc', {
    cc1: req.user.cc1,
    cc2: req.user.cc2,
    cc3: req.user.cc3
    
}));

//Credit card handle
router.post('/cc', ensureAuthenticated, (req, res) => {
    User.findOneAndUpdate({_id:req.user.id},{
        cc1: req.body.cc1, 
        cc2: req.body.cc2,
        cc3: req.body.cc3
    },    
    {new: true},(err,doc)=>{
        console.log('#### Updated Record ####',doc);
        res.redirect('/dashboard');
        
    });
});

  

module.exports = router;