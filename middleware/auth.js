const {validateUser} = require('../service/auth.js');

function authorization(req,res,next){

}

function authenticatCookie(cookieName){
    return(req,res,next)=>{
        const token = req.cookies[cookieName];
        if(!token) return next();
        try{
            const User = validateUser(token);
            req.user = User            
        }catch(error){
            console.error(error);
        };
        return next();
    }
}

module.exports ={
    authenticatCookie
}