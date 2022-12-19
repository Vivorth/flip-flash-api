
const jwt = require('jsonwebtoken')

const authenticate = async (req,res,next) => { 
    try {
        const token = req.headers.authorization
        if(!token) return res.status(400).json({err : 'Invalid Authentication'}) 

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET) 
        if(!decoded) return res.status(400).json({err : 'Invalid Authentication'})

       req.user = decoded
       next()
    } catch (error) {
        res.status(500).json({message : 'Authentication failed'})
    }
   

}


module.exports = authenticate