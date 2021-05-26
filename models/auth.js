const Sequelize = require('sequelize');
const configDataBase = require('../config/database');
const db = new Sequelize(configDataBase);

async function getUser(credentialsS) {
    const response = await db.query("SELECT * FROM system_user where email = :email", {
    type: Sequelize.QueryTypes.SELECT,
    replacements:{
        email: credentialsS.email,
    },   
});
   
    console.log('resposta do banco', response);
 return response[0];
}

module.exports = {
    getUser: getUser,
}