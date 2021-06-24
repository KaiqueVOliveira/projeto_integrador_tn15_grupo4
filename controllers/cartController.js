const cartModel = require("../models/cart");
const typesModel = require('../models/types');
const productsModel = require('../models/products')
const config = require('../config/database');
const Sequelize = require('sequelize');
const db = new Sequelize(config);

let cartController = {
    cartView: async(req, res) => {
        let loggedUser = req.session.user;
        let id = loggedUser.id;
        if(loggedUser){
            let productId = await cartModel.innerJoinCart(loggedUser);
            console.log(productId[0].productId)
            let products = productId.map(function(product,){
                return product.productId
            })

           let productsArray = [] 
            for(let i=0;i < products.length;i++){
            let productInfo = await productsModel.getById(products[i]);
                productsArray.push(productInfo);
            }
            console.log(productsArray);
            console.log(loggedUser.username + ' passando pelo cart view');
            
            if(!productId){
                return res.render('user-cart',{id: id, cartError:false, productsError:false, product:productsArray, loggedUser: true, adminLogin:false, cartProductError:false, adminLogin:false});
            }

            else{
                return res.render('user-cart',{user: loggedUser.username, id: id, cartError:false, productsError:false, product:productsArray, loggedUser: true, adminLogin:false,cartProductError:false, adminLogin:false});
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
        await cartModel.insertIntoCart(loggedUser, productId);
                
        res.render('products/details',{products: products, loggedUser: true, adminLogin:true, productAdded: true});
    },
}

module.exports = cartController;