const cartModel = require("../models/cart");
const typesModel = require('../models/types');
const productsModel = require('../models/products')

let cartController = {
    cartView: async(req, res) => {
        let loggedUser = req.session.user;
        
        if(loggedUser != undefined){
            
            const cartId = cartModel.getById(loggedUser);
            const productId = cartModel.getById(loggedUser.productId)
            const product = await productsModel.getById(productId);
            return res.render('user-cart',{id: cartId, cartError:false, productsError:false, product:product, loggedUser: true, adminLogin:true});
        }
        else{
            res.render('login',{cartError:true, productsError:false, error:false, loggedUser: loggedUser})
        }
    },

    productsView: async(req, res) => {
        let loggedUser = req.session.user;
        
        if(loggedUser != undefined){
            if(loggedUser.usertype != 'admin'){
                console.log(loggedUser.usertype)
                res.render('login',{cartError:false, productsError:true, error:true, loggedUser: loggedUser})
            }
            else{
                const types = await typesModel.getTypes();

                return res.render('products/register',{cartError:false,productsError:false,types:types, loggedUser: true, adminLogin:true});
            }
        }
        else{
            res.render('login',{cartError:false, productsError:true, error:false, loggedUser: loggedUser})
        }
    },
}

module.exports = cartController;