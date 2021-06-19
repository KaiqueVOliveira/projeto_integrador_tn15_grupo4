const Sequelize = require("sequelize");
const config = require("../config/database");
const db = new Sequelize(config);

async function get(username) {
  const user = await db.query(
    "SELECT id, name, username, password, usertype FROM login WHERE username = :username;",
    {
      type: Sequelize.QueryTypes.SELECT,
      replacements: {
        username,
      },
    }
  );
  return user[0];
}

async function post({ name, username, password }) {
  await db.query(
    "INSERT INTO login (name, username, password, usertype) VALUES (:name, :username, :password, :usertype)",
    {
      replacements: {
        name,
        username,
        password,
        usertype: 'buyer'
      },
    }
  );
}

async function put({ id, name, password }) {
  await db.query(
    "UPDATE login SET name = :name, password: password WHERE id = :id",
    {
      replacements: {
        id,
        name,
        password,
      },
    }
  );
}

async function remove(id) {
  await db.query("DELET FROM login WHERE id = :id", {
    replacements: {
      id,
    },
  });
}

module.exports = {
  get: get,
  post: post,
  put: put,
  remove: remove,
};
