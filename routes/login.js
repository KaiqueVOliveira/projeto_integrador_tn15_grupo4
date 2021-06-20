var express = require("express");
var router = express.Router();
var adminAuth = require('../middlewares/adminAuth')

const loginController = require("../controllers/loginController");
const cartController = require('../controllers/cartController');
const { productsView } = require("../controllers/cartController");


/* GET home page. */
router.get("/", loginController.get);

router.post("/", loginController.login);

router.get("/register", loginController.getRegister)

router.post("/create", loginController.post);

router.get('/cart/:id', cartController.cartView);

router.get('/products', adminAuth, cartController.productsView)

module.exports = router;
