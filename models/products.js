const Sequelize = require("sequelize");
const config = require("../config/database");
const db = new Sequelize(config);

async function getProducts() {
    const result = await db.query("select * from products;", { type: Sequelize.QueryTypes.SELECT });
    return result;
}