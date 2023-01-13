const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const mongoose = require('mongoose')
const morgan = require('morgan') // use it to log more detail of user request
const dotenv = require('dotenv')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const session = require("express-session");
const serverless = require("serverless-http");
const router = express.Router()
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
    origin : ["http://localhost:4200","http://localhost:8000","http://localhost:3001"], // change when deployed
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

app.use('/flip_flash',UserRoute)
app.use('/flip_flash',CategoryRoute)
app.use('/flip_flash',FlashCardRoute)

router.get('/',function(req,res){
    res.json({
        'path' : 'Home',
        'firstName' :'Bibek'
    })
})
app.use('/.netlify/functions/api',router)
module.exports = app
module.exports.handler = serverless(app);
