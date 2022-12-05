const express = require('express');

const app = express();


//listen requests

app.listen(process.env.port || 8000, function() {
    console.log('App is running!')
});