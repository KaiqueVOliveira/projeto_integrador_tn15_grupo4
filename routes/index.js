var express = require('express');
var router = express.Router();
var loginModel = require('../models/login')

/* GET home page. */
router.get ('/', async function(req, res, next) {
  let loggedUser = req.session.user
  console.log(loggedUser)
  if(loggedUser){
    const user = await loginModel.get(loggedUser.username)
  }
  else{
    res.redirect('/login')
  }
  res.render('index', {loggedUser: loggedUser, adminLogin: user.userType});
});

module.exports = router;
