
const jwt = require('jsonwebtoken')
const {getNewAccessToken} = require('../controllers/auth_controller')
const authenticate = async (req,res,next) => { 
    try {
        const token = req.cookies.accessToken
        console.log(token)
        if(!token) return res.status(400).json({err : 'Invalid Authentication'}) 

        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,function(err,decoded){
            console.log("Err",err)
            console.log("Decoded",decoded)
            req.user = decoded
            if(err){
                if(err.name == "TokenExpiredError"){
                    const new_token = getNewAccessToken(req,res)
                    // console.log("Auth New Token",new_token)
                    // req.headers.authorization = new_token
                    // res.status(201).json({
                    //     message : 'Old Token Expired, New AccessToken Generated',
                    //     accessToken : new_token
                    // })
                    res.cookie('accessToken',new_token)
                }
           
            }else{
                if(!decoded) return res.status(400).json({err : 'Invalid Authenticationasdsa'})
            }
            // console.log("decoded",decoded)
        }) 
        next()
      
    } catch (error) {
        console.log(error)
        res.status(500).json({message : 'Authentication failed',
                              error : error
                                })
    }
   

}


module.exports = authenticate