const users = require('../models/user.js');
const {setUser} = require('../service/auth.js');


async function handleuserSignup(req,res){
    const {email,password,fullname} = req.body;
    try{
        const exsitinguser = await users.findOne({email:email});
        if(exsitinguser){
            return res.status(400).render('signup',{error:'Email already exits'})
        }
        const newUser = await users.create({
            fullname:fullname,
            email,
            password
        });

        const token = setUser(newUser);
        res.cookie('token',token);

        return res.redirect('/');
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

        const token = setUser(user);
        res.cookie('token',token);
        return res.redirect('/');
    }catch(error){
        console.error('Error during user sign-up:', error);
        return res.status(500).send('Internal server error');
    }
}
function handleuserLogout(req,res){
    try{
        res.clearCookie('token');
        return res.redirect('/signin');
    }catch(error){
        console.error('Error during logout:', error);
        return res.status(500).send('Internal server error');
    }

}

async function handleuserUpdate(req,res){
    if(req.fileUploadError) return res.status(400).send(req.fileUploadError);
    const userId = req.user._id;
    if(!userId) return res.redirect('/signin');

    await users.findByIdAndUpdate(userId,{
        profile:`/uploads/${userId}/${req.file.filename}`
    });

    return res.redirect('/');
}


module.exports = {
    handleuserSignin,
    handleuserSignup,
    handleuserLogout,
    handleuserUpdate
}