const mongoose = require('mongoose') ;

const flashcardSchema = new mongoose.Schema({
    title : {
        type : String, 
        required : true
    },
    explanation : {
        type : String , 
        required : true 
    },
    category_id : {
        type : String , 
        required : true
    },
    created_date : {
        type : Date , 
        required : true,
        default : Date.now

    },
    color : {
        type : String , 
        required : false ,
        
    } ,
    isSaved : {
        type : Boolean,
        required : true ,
        default : false
    }
})

module.exports = mongoose.model('FlashCard',flashcardSchema)