var express = require('express');
var router = express.Router();
let productsController = require('../controllers/controllerProducts');
const multer = require('multer');
const path = require('path');
const {check,validationResult, body} = require('express-validator')
const fs = require('fs');


var storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, path.join('uploads'))
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
})

var upload = multer({storage: storage})

/* GET home page. */
router.get('/', productsController.viewForm);
router.post('/', upload.single('productImg'), productsController.salvarForm);
router.get('/edit/:id', productsController.getProductById);
router.put('/edit/:id', productsController.edit);
router.get('/list', productsController.listarProdutos);
router.delete('/deletar/:id', productsController.deletarProduto);

module.exports = router;