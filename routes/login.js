var express = require("express");
var router = express.Router();
var auth = require('../middlewares/auth')

const loginController = require("../controllers/controllerLogin");


/* GET home page. */
router.get("/", loginController.get);

router.post("/", loginController.login);

router.get("/register", loginController.getRegister)

router.post("/create", loginController.post);

module.exports = router;
