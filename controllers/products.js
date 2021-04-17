let banco = require('../models/bancoDeProdutos');
const types = require('../models/types');
const fs = require('fs')
const path = require('path')


let productsController = {

    viewForm: (req, res) => {
        return res.render('products/register', {banco: banco, types: types});
    },
    
    salvarForm: (req, res) => {
        let {name, price, type, id, imgProduto} = req.body
        let{files} = req
        console.log(req.body)
        req.body.id = parseInt(Math.random() * 1000)
        banco.push(req.body)
        console.log(banco)
        
        return res.render('products/register',{banco: banco, types: types})
    },

    viewAttForm: (req,res) => {
        let id = req.params.id;
        const product = banco.find(function(product){
           if ( parseInt(id) === product.id){
            return product
           }
           
        })
        res.render('products/edit', {banco: banco[id], types: types, product: product});
    },

    editar: (req,res) => {
        let {name, price, type} = req.body
        res.send('Você editou o produto ' + name)
    },

    listarProdutos: (req,res) => {
        res.render('products/list', {listaProdutos: banco})
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