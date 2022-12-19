const mongoose = require('mongoose') ;

const category = new mongoose.Schema({
    category_name : {
        type : String, 
        required : true
    },
    flash_card_id_list : {
        type : Array ,
        required : false
    },
    user_id : {
        type : String , 
        required : true
    },
    created : {
        type : Date , 
        default : Date.now
    }
})

module.exports = mongoose.model('Category',category)