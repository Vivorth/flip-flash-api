const mongoose = require('mongoose') ;

const userSchema = new mongoose.Schema({
    username : {
        type : String, 
        required : true
    },
    email : {
        type : String , 
        required : true ,
    },
    password : {
        type : String , 
        required : true 
    },
    task_id_list : {
        type : Array , 
        required : false 
    },
    category_id_list : {
        type : Array , 
        required : false
    },
    created_date : {
        type : Date , 
        required : true, 
        default : Date.now

    }

})



module.exports = mongoose.model('User',userSchema)