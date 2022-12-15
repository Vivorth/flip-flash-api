const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register = async (req,res,next) => {
    const username= req.body.username 
    const email = req.body.email
    const password = req.body.password

    if(!username || !email  || !password) return res.status(400).json({message : 'Check the field again'})

    bcrypt.hash(password, 10 , function(err,hashedPass){
        if(err) {
            res.status(501).json({message : err})
        }
        let user = new User({
        username : req.body.username,
        email : req.body.email , 
        password : hashedPass
    })
    user.save().then(user => { 
        res.status(200).json({
            message : "Register successfully!",
            code: "000",
            data: {
              user_id: user._id,
              email : user.email,
              username: user.username,
              task_id_list : [],
              category_id_list: []
            }
        })

    }).catch(err =>{
        console.log(err);
    })
    })

}

const signin = async(req,res) => {
    const {email , password } = req.body
    const user = await User.findOne({email})

    if(!user) {
        return res.status(400).json({message : 'No user found'})
    }

    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch) return res.status(501).json({message : 'Incorrect Password'})

    const access_token = createAccessToken({id : user._id})
    const refresh_token = createRefreshToken({id: user._id})
    res.json({
        msg: "Login Success!",
        refresh_token,
        access_token,
        user: {
            id : user._id,
            username: user.username,
            email: user.email,
            task_id_list : user.task_id_list ,
            category_id_list : user.category_id_list
        },
        
    })
} 

const createAccessToken = (payload) => {
    const res = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15m'})
    console.log("JWT",res);
    return res
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '3d'})
}


module.exports = {
    register,signin
}