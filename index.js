const express = require('express');
const app = express();
const port = 3000;

const path = require('path');
const cookieParser = require('cookie-parser');
const {authenticatCookie} = require('./middleware/auth.js');

const {connectdb} = require('./connection');

const staticRoute = require('./routes/staticRoute.js');
const userRoute = require('./routes/userRoute.js');
const blogRoute = require('./routes/blogRoute.js');

connectdb('mongodb://localhost:27017/blogs_db').catch(console.error).then(console.log('Connected to database'));

app.set('view engine', 'ejs');
app.set('views',path.resolve('./views'));
app.use(express.static(path.resolve('./public'))); 


app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(authenticatCookie('token'))

app.use('/',staticRoute);
app.use('/user',userRoute);
app.use('/blog',blogRoute);

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});