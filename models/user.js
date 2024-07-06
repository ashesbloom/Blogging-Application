const {Schema,model} = require('mongoose');
const {createHmac,randomBytes} = require('crypto');  //https://nodejs.org/api/crypto.html

const userSchema = new Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    salt:{ //required to hash password
        type:String,
    },
    password:{
        type:String,
        required:true
    },
    profile:{
        type:String,
        default: '/asset/def_profile.png'
    },
    role:{
        type:String,
        enum:['USER','ADMIN'],  //enum is used to restrict the value of role to only USER or ADMIN we can't give any other value to this field
        default:'USER'
    }
},{timestamps:true})

userSchema.pre('save',function(next){ //pre is a middleware which is executed before saving the data in the database
    const user = this; //this refers to the current user entry
    if(!user.isModified('password')) return;
    //to hash a password we will use in-built module named crypto

    const salt = randomBytes(16).toString(); //random string of 16-bit (secret key) to encrypt password
    const hashedPassword = createHmac('sha256',salt).update(user.password).digest('hex');

    this.salt = salt;
    this.password = hashedPassword;
    next();
})
//static is used to create a custom function for the schema
userSchema.static('authenticatePassword',async function(email, password){ //authenticatePassword is a custom function which will be used to authenticate the password
    const user = await this.findOne({email});
    if(!user) return {error:'User not found!'};
    const salt = user.salt;
    const hashedPassword = user.password;
    const userProvidedhash = createHmac('sha256',salt).update(password).digest('hex');

    if(hashedPassword !== userProvidedhash) return {error:'Password did not match!'};

    return user;

})

const userModel = model('user',userSchema);

module.exports = userModel;