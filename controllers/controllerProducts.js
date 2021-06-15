const typesModel = require('../models/types')
const productsModel = require('../models/products')
const fs = require('fs')
const path = require('path')
const config = require('../config/database');
const Sequelize = require('sequelize');
const db = new Sequelize(config);


let productsController = {

    viewForm: async(req, res) => {
        const types = await typesModel.getTypes();

        return res.render('products/register',{types:types});
        
    },
    
    salvarForm: async (req, res) => {
        const types = await typesModel.getTypes();
        let {name, price, type, description} = req.body;
        let {files} = req
        
        console.log(req)
        await db.query('insert into products (name, price, type, img, description) values (:name, :price, :type, :img, :description)',{
            replacements: {
                name: name,
                price: price,
                type: type,
                img: req.file.filename,
                description: description
            }
        })
        

          
        /*console.log(req.body)
        req.body.id = parseInt(Math.random() * 1000)
        banco.push(req.body)
        console.log(banco)*/
        
        res.render('products/register',{types: types})
    },

    getProductById:  async (req,res) => {
        const types = await typesModel.getTypes();
        let id = req.params.id;
        const product = await productsModel.getById(id)
        res.render('products/edit',{types: types, product: product});
    },

    edit: async (req,res) => {
        const types = await typesModel.getTypes();
        const product = await productsModel.updateProduct(productPut)
        let productPut = req.body
        console.log(productPut)
        let {files} = req
        
        res.redirect('products/list',{types: types, product: product})
    },

    listarProdutos: async (req,res) => {
        const result = await db.query("select * from products;", { type: Sequelize.QueryTypes.SELECT });
            console.log(result);        
            res.render('products/list', {products:result})
    },

    deletarProduto: (req,res) => {
        let {id} = req.params;
        banco = banco.filter(function(registro){
            return registro.id !== parseInt(req.params.id);
        });

        res.render('products/list', {listaProdutos: banco});
    }
}

module.exports = productsController;