const API_Auth = async(req,res,next)=>{
    try {
        const api_token = req.headers.api_token
        if(api_token == process.env.API_TOKEN){
            next()

        }else{
            res.status(501).json({error : "Wrong API Token"})
        }
    } catch (error) {
        res.status(500).json({message : 'Authentication failed'})
    }
}

module.exports = API_Auth