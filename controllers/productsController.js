const typesModel = require('../models/types')
const productsModel = require('../models/products');
const config = require('../config/database');
const Sequelize = require('sequelize');
const db = new Sequelize(config);

let productsController = {

    viewForm: async(req, res) => {
        let loggedUser = req.session.user;
        
        //let loggedUser = req.session.user
        const types = await typesModel.getTypes();

        return res.render('products/register',{types:types, loggedUser: true, adminLogin:true});
        
    },
    
    registerProduct: async (req, res) => {
        const types = await typesModel.getTypes();

        let {name, price, type, description} = req.body;
        let {filename} = req.file  ;  

        const product = productsModel.saveProduct({name, price, type, description, filename})
                
        res.render('products/register',{types: types, products: product, loggedUser: true, adminLogin:true});
    },

    getProductById:  async (req,res) => {
        const types = await typesModel.getTypes();
        
        let id = req.params.id;

        const product = await productsModel.getById(id);

        res.render('products/edit',{types: types, products: product, loggedUser: true, adminLogin:true});
    },

    edit: async (req,res) => {
        
        let {name, price, type, description} = req.body;
        let id = req.params.id;


        if(req.file){
            const types = await typesModel.getTypes();
            let {filename} = req.file;
            const product = await productsModel.updateProduct({name, price, type, description, id, filename},{filename});
        
            res.render('products/edit',{types: types, products: product, loggedUser: true, adminLogin:true});
            
        }
        else{
            const types = await typesModel.getTypes();
            const product = await productsModel.updateProduct({name, price, type, description, id});
        
            res.render('products/edit',{types: types, products: product, loggedUser: true, adminLogin:true});

        }
    },

    listProducts: async (req,res) => {
        const result = await db.query("select * from products;", { type: Sequelize.QueryTypes.SELECT });
        let loggedUser = req.session.user
        if(loggedUser){
            if(loggedUser.usertype == 'admin'){
                res.render('products/list', {products:result, user: req.session.user, loggedUser: true, adminLogin:true});
            }
            else{
                res.render('products/list', {products:result, user: req.session.user, loggedUser:true, adminLogin:false});
            }
        }
        else{
            res.render('products/list', {adminLogin:false, loggedUser:false, products:result})
        }
    },

    deleteProducts: async (req,res) => {
        let productId = req.params.id;
        
        //const product = await productsModel.getById(productId);
        await productsModel.deleteProduct(productId);
      
        if (req.query.json) {
          return res.sendStatus(200);
        }      

        res.redirect("/products/list/");
    }
}

module.exports = productsController;