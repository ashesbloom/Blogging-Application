const jwt = require('jsonwebtoken');
const key = '@thisSHouldBeSECRET@';

function setUser(user){
    const payload = {
        _id:user._id,
        email:user.email,
        username:user.fullname,
        profileImage:user.profile,
        role:user.role
    }
    const token = jwt.sign(payload,key);
    return token;
}

function validateUser(token){
    if(!token) return null;
    try{
        return jwt.verify(token,key);
    }catch(error){
        console.error(error);
        return null;
    }
}

module.exports={
    setUser,
    validateUser
}