const express = require('express');
const routes = require('./flip_flash_api/routes/flip_flash')
// set up express app
const app = express();
const mongoose = require('mongoose')
const morgan = require('morgan') // use it to log more detail of user request
const dotenv = require('dotenv')

app.use(routes)

// listen for requests
app.listen(process.env.port || 8000, function(){
   console.log('Server is running...');
});
// import route 
const UserRoute = require('./flip_flash_api/routes/user');
const CategoryRoute = require('./flip_flash_api/routes/category')

// implement .env file
dotenv.config({path : 'config.env'})

// avoid warning by mongoose
mongoose.set('strictQuery', false);

// connect database
mongoose.connect(process.env.MONGODB_URL)


app.use(morgan('tiny'))
app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())

//listen requests
app.listen(process.env.port || 8000, function() {
    console.log('App is running on http://localhost:3000/ by default')
});

// use route
app.use('/flip_flash',UserRoute)
app.use('/flip_flash',CategoryRoute)
