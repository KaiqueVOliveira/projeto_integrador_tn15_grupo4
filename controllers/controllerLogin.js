const bcrypt = require("bcrypt");

const loginModel = require("../models/login");

function get(_, res) {
  res.render("login", { error: false, created: false, exists: false });
}

function getRegister(_, res) {
  res.render("register-login", { error: false, created: false, exists: false });
}

async function login(req, res) {
  const { username, password } = req.body;

  const user = await loginModel.get(username);

  if (!user) {
    res.render("login", { error: true, created: false, exists: false });
  }
  const comparePassword = bcrypt.compareSync(password, user.password);
  if (!comparePassword) {
    res.render("login", { error: true, created: false, exists: false });
  } else {
    req.session.user = {
      id: user.id,
      name: user.name,
      username: user.username,
    };
    
    res.redirect("/");
  }
}

async function post(req, res) {
  const { name, username, password } = req.body;

  const user = await loginModel.get(username);

  if (user) {
    res.render("register-login", { error: true, created: false, exists: true });
  }

  const encryptPassword = bcrypt.hashSync(password, 12);

  await loginModel.post({
    name,
    username,
    password: encryptPassword,
  });

  res.render("login", {
    error: false,
    created: true,
    exists: false,
  });
}

module.exports = {
  get,
  login,
  post,
  getRegister
};
