function auth(req, res, next){
    console.log(req.session.user)
    if(typeof(req.session.user) != 'undefined'){
        
        return next();
        
    }
    else{
        console.log('ocorreu um erro');
        return res.redirect('/login');
        
    }
    
}

module.exports = auth