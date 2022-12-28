const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const mongoose = require('mongoose')
const morgan = require('morgan') // use it to log more detail of user request
const dotenv = require('dotenv')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const session = require("express-session");

// import route 
const UserRoute = require('./flip_flash_api/routes/user');
const CategoryRoute = require('./flip_flash_api/routes/category')
const FlashCardRoute = require('./flip_flash_api/routes/flip_flash')

// implement .env file
dotenv.config({path : 'config.env'})

// avoid warning by mongoose
mongoose.set('strictQuery', false);

// connect database
mongoose.connect(process.env.MONGODB_URL)


app.use(morgan('tiny'))
app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors({
    origin : "http://localhost:3001", // change when deployed
	credentials: true,
    // exposedHeaders : ["set-cookie"],

}))

//listen requests
const port = process.env.PORT || 8000
app.listen(port, function() {
    console.log(`App is running on http://localhost:${port}/`,)
});

// use route
// With middleware
app.get('/', function(req, res, next){
    res.cookie('title', '12');
    res.cookie('accessToken','asdasd',{httpOnly : true})
    return res.json({cookieset :'cookie set'}); 
})
app.get('/getCookies', function(req, res){
    const accessToken = req.cookies.accessToken;
    console.log(accessToken)
    return res.json({accessToken : accessToken});
})
app.use('/flip_flash',UserRoute)
app.use('/flip_flash',CategoryRoute)
app.use('/flip_flash',FlashCardRoute)