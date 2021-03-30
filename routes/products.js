var express = require('express');
let productsController = require('../controllers/products')

var router = express.Router();



/* GET home page. */
router.get('/', productsController.viewForm);
router.post('/', productsController.salvarForm);
router.get('/:id/editar', productsController.viewAttForm);
router.put('/editar', productsController.editar);
router.get('/lista', productsController.listarProdutos);
router.delete('/deletar/:id', productsController.deletarProduto);

module.exports = router;