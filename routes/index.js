var express = require('express');
var router = express.Router();
var loginModel = require('../models/login')

/* GET home page. */
router.get ('/', async function(req, res, next) {
  let loggedUser = req.session.user
  console.log(loggedUser)
  if(loggedUser){
    if(req.session.user.usertype == 'admin'){
      const user = await loginModel.get(loggedUser.username);
      res.render('index', {loggedUser: true, adminLogin:true});
    }
    else{
      const user = await loginModel.get(loggedUser.username);
      res.render('index', {loggedUser: true, adminLogin:false, user:loggedUser.id});
    }
  }
  else{
    res.render('index', {loggedUser: false, adminLogin:false});
  } 
});

module.exports = router;

