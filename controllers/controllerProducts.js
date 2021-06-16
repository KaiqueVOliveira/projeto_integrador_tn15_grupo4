const typesModel = require('../models/types')
const productsModel = require('../models/products')
const fs = require('fs')
const path = require('path')
const config = require('../config/database');
const Sequelize = require('sequelize');
const db = new Sequelize(config);
const express = require("express");


let productsController = {

    viewForm: async(req, res) => {
        const types = await typesModel.getTypes();

        return res.render('products/register',{types:types});
        
    },
    
    salvarForm: async (req, res) => {
        const types = await typesModel.getTypes();
        let {name, price, type, description} = req.body;
        let file = req.file.filename        
        await db.query('insert into products (name, price, type, img, description) values (:name, :price, :type, :img, :description)',{
            replacements: {
                name: name,
                price: price,
                type: type,
                img: file,
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
        res.render('products/edit',{types: types, products: product});
    },

    edit: async (req,res) => {
        const types = await typesModel.getTypes();
        let {name, price, type, description} = req.body;
        let id = req.params.id
        let {filename} = req.file;
        const product = await productsModel.updateProduct({name, price, type, description, id, filename});
        res.render('products/edit',{types: types, products: product})
    },

    listarProdutos: async (req,res) => {
        const result = await db.query("select * from products;", { type: Sequelize.QueryTypes.SELECT });  
            res.render('products/list', {products:result});
    },

    deletarProduto: async (req,res) => {
        let productId = req.params.id;
        const product = await productsModel.getById(productId);
        await productsModel.deleteProduct(productId);
      
        if (req.query.json) {
          return res.sendStatus(200);
        }      

        res.redirect("/products/list/");
    }
}

module.exports = productsController;