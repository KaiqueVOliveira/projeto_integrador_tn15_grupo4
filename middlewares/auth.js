function auth(req, res, next){
    if(typeof(req.session.username) !== 'undefined'){
        return next()
    }
    else{
        console.log('ocorreu um erro')
        return res.render('login')
        
    }
}

module.exports = auth