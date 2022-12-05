const express = require('express');

const router = express.Router();

router.get('/', (req, res, next)=> {
    console.log('GET');
});

module.exports = router;