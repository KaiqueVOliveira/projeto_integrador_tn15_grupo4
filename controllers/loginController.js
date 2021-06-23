const bcrypt = require("bcrypt");

const loginModel = require("../models/login");
const cartModel = require('../models/cart');

function get(req, res) {
  //console.log(req.session.user)
  let loggedUser = req.session.user
  if(!loggedUser){
    res.render("login", {loggedUser:false, error: false, created: false, exists: false, cartError:false, productsError:false });
  }
  else{
    res.render("login", {loggedUser:true, error: false, created: false, exists: false, cartError:false, productsError:false });
  }
}

function getRegister(_, res) {
  res.render("register-login", { error: false, created: false, exists: false });
}

async function login(req, res) {
  const {username, password} = req.body;
  
  const user = await loginModel.get(username);

  if (!user) {
    res.render("login", {checkLogin:false, error: true , created: false, exists: false, cartError:false, productsError:false, loggedUser:false });
  }
  
  const comparePassword = bcrypt.compareSync(password, user.password);

  if (!comparePassword) {
    console.log('senha errada')
    res.render("login", {checkLogin:false, error: true , created: false, exists: false, cartError:false, productsError:false, loggedUser:false });
  }
  else {
    req.session.user = {
      id: user.id,
      name: user.name,
      username: user.username,
      usertype: user.usertype
    },{checklogin:true, error: false, cartError:false, productsError:false, loggedUser:true};
    
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

async function logout(req, res) {
  req.session.destroy();
  res.redirect('/')
}

module.exports = {
  get,
  login,
  post,
  getRegister,
  logout
};
