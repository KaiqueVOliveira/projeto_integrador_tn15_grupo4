const loginModel = require("../models/login");

const cookieLogin = (req, res, next) =>{
    
    if(req.cookies.logado != undefined && req.session.user.username == null){
        let username = req.cookies.logado;
        console.log(username)
        const user = loginModel.get(username)
        ;
        if(username == user.username){
            req.session.user.usuario = user.username
        } 
    }
}

module.exports = cookieLogin