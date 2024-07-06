const { error } = require('console');
const users = require('../models/user.js');

async function handleuserSignup(req,res){
    const {email,password,fullname} = req.body;
    try{
        const exsitinguser = await users.findOne({email:email});
        if(exsitinguser){
            return res.status(400).render('signup',{error:'Email already exits'})
        }
        await users.create({
            fullname:fullname,
            email,
            password
        });
        return res.render('home',{
            usersname:fullname,
            role:true
        }) 
    }catch(error){
        console.error('Error during user sign-up:', error);
        return res.status(500).send('Internal server error');
    }
}

async function handleuserSignin(req,res){
    const {email,password} = req.body;
    try{
        const user = await users.authenticatePassword(email,password);
        if(user.error) return res.status(400).render('signin',{error:user.error});
        return res.render('home',{
                username:user.fullname,
                role:user.role
            });
    }catch(error){
        console.error('Error during user sign-up:', error);
        return res.status(500).send('Internal server error');
    }
}
function handleuserLogout(req,res){
    try{
        return res.render('signin');
    }catch(error){
        console.error('Error during logout:', error);
        return res.status(500).send('Internal server error');
    }

}

module.exports = {
    handleuserSignin,
    handleuserSignup,
    handleuserLogout
}