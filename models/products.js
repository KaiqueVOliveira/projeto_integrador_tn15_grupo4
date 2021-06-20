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

async function saveProduct(product){
  const result = await db.query('insert into products (name, price, type, img, description) values (:name, :price, :type, :img, :description)',{

    replacements: {
        name: product.name,
        price: product.price,
        type: product.type,
        img: product.filename,
        description: product.description
    }
  })
  return result
}

async function updateProduct(product,file) {
    if(file){
      const result = await db.query("update products set name = :name, price = :price, type = :type, description = :description, img = :img where id = :id", {
        replacements: {
          name: product.name,
          price: product.price,
          type: product.type,
          img: product.filename,
          description: product.description,
          id: product.id
        }
      })
      return result
    }
    else{
      const result = await db.query("update products set name = :name, price = :price, type = :type, description = :description where id = :id", {
        replacements: {
          name: product.name,
          price: product.price,
          type: product.type,
          description: product.description,
          id: product.id
        }
      })
      return result
    }
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
    deleteProduct:deleteProduct,
    saveProduct:saveProduct
}