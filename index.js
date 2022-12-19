const express = require('express');
const routes = require('./flip_flash_api/routes/flip_flash')
// set up express app
const app = express();

app.use(routes)

// listen for requests
app.listen(process.env.port || 8000, function(){
   console.log('Server is running...');
});
