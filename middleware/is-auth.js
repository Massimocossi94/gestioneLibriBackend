const jwt = require ('jsonwebtoken');
const User = require ('../models/user');

module.exports = (req,res,next) => {
    console.log('AUTHORIZATION MIDDLEWARE');
    console.log(req.get('Authorization'));

    const auth = req.get('Authorization');

    if(!auth){
        return res.status(401).json({
            message : 'Non Autorizzato!!!',
        });
    }
    const token = auth.split(' ')[1];
    let decode;
    try{
        decode = jwt.verify(token, 'MFFB8DuC7uZ6upKCGNtD');
    }catch(err){
        return res.status(500).json({
            message : 'Non Autorizzato!!!',
        });
    }
    if(!decode){
        return res.status(401).json({
            message : 'Non Autorizzato!!!',
        });
    }
    let userId = decode.id;
    User.findByPk(userId).then(user => {
        req.user = user;
        return next();
    })
    .catch(err => {
        return res.status(401).json({
            message : 'Non Autorizzato!!!',
        });
    });   
    
    
};