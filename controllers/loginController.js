const bcrypt = require("bcrypt");

const loginModel = require("../models/login");
const cartModel = require('../models/cart');

function get(req, res) {
  //console.log(req.session.user)
  let loggedUser = req.session.user
  res.render("login", {loggedUser:loggedUser, error: false , created: false, exists: false, cartError:false, productsError:false });
}

function getRegister(_, res) {
  res.render("register-login", { error: false, created: false, exists: false });
}

async function login(req, res) {
  const {username, password} = req.body;
  
  const user = await loginModel.get(username);

  if (!user) {
    res.render("login", {checkLogin:false, error: false , created: false, exists: false, cartError:false, productsError:false });
  }
  
  const comparePassword = bcrypt.compareSync(password, user.password);

  if (!comparePassword) {
    console.log('senha errada')
    res.render("login", {checkLogin:false, error: false , created: false, exists: false, cartError:false, productsError:false });
  }
  else {
    req.session.user = {
      id: user.id,
      name: user.name,
      username: user.username,
      usertype: user.usertype
    },{checklogin:true, error: false, cartError:false, productsError:false};
    
    res.redirect("/");
  }
}

async function post(req, res) {
  const { name, username, password } = req.body;

  const user = await loginModel.get(username);

  if (user) {
    res.render("register-login", { error: true, created: false, exists: true, cartError:false, productsError:false });
  }

  const encryptPassword = bcrypt.hashSync(password, 12);

  await loginModel.post({
    name,
    username,
    password: encryptPassword,
  });

  cartModel.insertUserIntoCart(req.body);

  res.render("login", {
    error: false,
    created: true,
    exists: false,
    cartError:false, 
    productsError:false, 
    loggedUser:false
  });
}

module.exports = {
  get,
  login,
  post,
  getRegister
};
