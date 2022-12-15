const mongoose = require('mongoose') ;

const TaskSchema = new mongoose.Schema({
    user_id : {
        type : String, 
        required : true
    },
    title : {
        type : String , 
        required : true 
    },
    description : {
        type : String , 
        required : true
    },
    is_completed : {
        type : Boolean , 
        required : true
    },
    priority : {
        type : String , 
        required : false ,
        default : Date.now
    } ,
    start_date : { 
        type : String , 
        required : true
    } ,
    end_date : { 
        type: String , 
        required : true
    } , 
    color : {
        type : String ,
        required : true , 
        default : '#FFFFFF'
    }
})

module.exports = mongoose.model('Tasks',TaskSchema)