const cartModel = require("../models/cart");
const typesModel = require('../models/types');
const productsModel = require('../models/products')
const config = require('../config/database');
const Sequelize = require('sequelize');
const db = new Sequelize(config);

let cartController = {
    cartView: async(req, res) => {
        let loggedUser = req.session.user;
        let id = req.params.id;
        if(loggedUser){
            //let getUser = await cartModel.getUserById(loggedUser)
            //let productId = await productsModel.getById(getUser.productId)
            /*const products = await db.query("select * from products;", { type: Sequelize.QueryTypes.SELECT });
            const cartProducts = await db.query("select * from cart;", { type: Sequelize.QueryTypes.SELECT });*/

            let productId = cartModel.innerJoinCart(loggedUser.username);
            console.log(loggedUser.username)
            console.log(productId)
            if(!productId){
                return res.render('user-cart',{id: id, cartError:false, productsError:false, product:productId, loggedUser: true, adminLogin:true, cartProductError:false});
            }

            else{
                return res.render('user-cart',{user: loggedUser.username, id: id, cartError:false, productsError:false, product:productId, loggedUser: true, adminLogin:true,cartProductError:false});
            }
        }
        else{
            res.render('login',{cartError:true, productsError:false, error:false, loggedUser: loggedUser});
        }
    },

    cartInsert: async (req, res) => {
        let productId = req.params.id;
        let loggedUser = req.session.user;

        const products = await productsModel.getById(productId);
        const insertProduct = cartModel.insertIntoCart(loggedUser, productId);
                
        res.render('products/details',{products: products, loggedUser: true, adminLogin:true, productAdded: true});
    },
}

module.exports = cartController;