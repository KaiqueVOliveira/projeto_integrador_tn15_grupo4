const Sequelize = require("sequelize");
const config = require("../config/database");
const { get } = require("./login");
const db = new Sequelize(config);

async function getUserById(username){
    const result = await db.query('select * from cart where username = :username',{
        type: Sequelize.QueryTypes.SELECT,
        replacements: {
            username: username.username,
        }
    });

    return result[0]
}

async function getProductById(productId){
    const result = await db.query('select * from cart where productId = :productId',{
        type: Sequelize.QueryTypes.SELECT,
        replacements: {
            productId: productId
        }
    });

    return result[0]
}

async function insertUserIntoCart(item){

    await db.query('insert into cart (userName) values (:userName)',{

        replacements: {
            userName: item.username
        }
    })
}

async function insertIntoCart(user, product){

    await db.query('insert into cart (userName, productId) values (:userName, :productId)',{

        replacements: {
            userName: user.username,
            productId: product
        }
    })
}


module.exports = {
    getUserById:getUserById,
    getProductById:getProductById,
    insertUserIntoCart: insertUserIntoCart,
    insertIntoCart:insertIntoCart
}