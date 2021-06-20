const Sequelize = require("sequelize");
const config = require("../config/database");
const { get } = require("./login");
const db = new Sequelize(config);

async function getById(id){
    const result = await db.query('select * from cart where userId = :userId',{
        type: Sequelize.QueryTypes.SELECT,
        replacements: {
            userId: id.id
        }
    });

    return result[0]
}

async function insertIntoCart(item){

    await db.query('insert into cart (userId, productId) values (:userId, :productId)',{

        replacements: {
            userId: item.userId,
            productId: item.productId
        }
    })
}

module.exports = {
    getById:getById,
    insertIntoCart:insertIntoCart
}