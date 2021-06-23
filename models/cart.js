const Sequelize = require("sequelize");
const config = require("../config/database");
const db = new Sequelize(config);

async function getUserById(username){
    const result = await db.query('select * from cart where username = :username',{
        type: Sequelize.QueryTypes.SELECT,
        replacements: {
            username: username.username,
        }
    });

    return result
}

async function getProductById(username){
    const result = await db.query('select id,productId, userName from cart where userName = :username',{
        type: Sequelize.QueryTypes.SELECT,
        replacements: {
            username: username.username
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

async function innerJoinCart(username){
    let result =  await db.query('select distinct productId from cart inner join products on cart.productId = products.id where userName = :userName',{
        type: Sequelize.QueryTypes.SELECT,
        replacements: {
            userName: username.username
        }
    });
    return result
}

module.exports = {
    getUserById:getUserById,
    getProductById:getProductById,
    insertUserIntoCart: insertUserIntoCart,
    insertIntoCart:insertIntoCart,
    innerJoinCart:innerJoinCart
}