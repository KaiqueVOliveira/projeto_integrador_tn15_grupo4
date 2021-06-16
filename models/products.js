const Sequelize = require("sequelize");
const config = require("../config/database");
const db = new Sequelize(config);

async function getById(id){
    const result = await db.query('select * from products where id = :productId',{
        type: Sequelize.QueryTypes.SELECT,
        replacements: {
            productId: id
        }
    });

    return result[0]
}

async function updateProduct(product) {
    const result = await db.query("update products set name = :name, price = :price, type = :type, img = :img where id = :id", {
      replacements: {
        name: product.name,
        price: product.price,
        type: product.type,
        img: product.filename,
        id: product.id
      }
    })
    return result
  }

  async function deleteProduct(productId) {
    await db.query("delete from products where id = :id " , {
      replacements: {
        id: productId
      }
    })
  }

module.exports = {
    getById:getById,
    updateProduct:updateProduct,
    deleteProduct:deleteProduct
}