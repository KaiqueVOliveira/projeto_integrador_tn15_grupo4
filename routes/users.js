var express = require('express');
var authModel = require('../models/login');
var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('login');
});

router.post('/', async function(req,res){
    console.log('dados recebidos', req.body);

    const user = await authModel.getUser(req.body);
    if(user !== undefined && user.password === req.body.password){
        console.log('Login realizado com sucesso');
        res.render('login');
    } else{
        res.locals.message = 'Erro ao realizar login';
        res.locals.error = req.app.get('env') === 'development' ? 'erro ao realizar login' : {};
        res.render('error');
    }    
})


module.exports = router;
