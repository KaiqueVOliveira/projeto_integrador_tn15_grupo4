const cartModel = require("../models/cart");
const typesModel = require('../models/types');
const productsModel = require('../models/products')

let cartController = {
    cartView: async(req, res) => {
        let loggedUser = req.session.user;
        let id = req.params.id;
        if(loggedUser){
            console.log('esse e o user logado' + loggedUser)
            let getUser = await cartModel.getUserById(loggedUser)
            //console.log(userId.id)
            //console.log(userId.productId)
            let productId = await productsModel.getById(getUser.productId)
            if(!productId){
                return res.render('user-cart',{id: id, cartError:false, productsError:false, product:productId, loggedUser: true, adminLogin:true,cartProductError:true});
            }

            else{

                return res.render('user-cart',{user: user, id: id, cartError:false, productsError:false, product:product, loggedUser: true, adminLogin:true,cartProductError:false});
            }
        }
        else{
            res.render('login',{cartError:true, productsError:false, error:false, loggedUser: loggedUser})
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