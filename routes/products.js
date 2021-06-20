var express = require('express');
var router = express.Router();
let productsController = require('../controllers/productsController');
let auth = require('../middlewares/auth');
let adminAuth = require('../middlewares/adminAuth');
const multer = require('multer');
const path = require('path');
const {check,validationResult, body} = require('express-validator');
const fs = require('fs');


var storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, path.join('public/images/uploads'));
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
})

var upload = multer({storage: storage})

/* GET home page. */
//router.get('/register', adminAuth, productsController.viewForm);
router.post('/register', upload.single('productImg'), productsController.registerProduct);

router.get('/edit/:id', adminAuth, productsController.getProductById);
router.put('/edit/:id', upload.single('productImg'), productsController.edit);

router.get('/list', productsController.listProducts);
router.delete('/delete/:id', productsController.deleteProducts);

module.exports = router;