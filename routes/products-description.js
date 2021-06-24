var express = require('express');
var router = express.Router();
const productsModel = require('../models/products') 

/* GET products-description. */

router.get('/:id', async function(req, res, next) {
  let id = req.params.id
  const result = await productsModel.getById(id)
  res.render("products-description", {product: result });
});


module.exports = router;