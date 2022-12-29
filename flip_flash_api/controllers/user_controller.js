const User = require('../models/user')

const getUserById = async(req,res) => {
    const userId = req.user.id
    User.findById(userId,function(err,docs){
        if(err){
            res.status(500).json({
                message : 'Status 500 Internal Server Error'
            })
        }else{
            res.status(200).json({
                message : 'Fetch User by ID successfully' ,
                data : docs
            })
        }
        
    })
}

module.exports = {getUserById}