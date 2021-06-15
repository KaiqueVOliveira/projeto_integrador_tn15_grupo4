const Sequelize = require("sequelize");
const config = require("../config/database");
const db = new Sequelize(config);

async function getTypes(){
    const result = await db.query('select * from types', {type: Sequelize.QueryTypes.SELECT});
    return result;
};
    
module.exports = {getTypes:getTypes}