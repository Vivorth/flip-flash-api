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

category.statics.isThisCategoryExist = async function(category_name,user_id){
    try {
        
        const category = await this.findOne({category_name,user_id})
        if(category) return false
        return true
        
    } catch (error) {
        console.log('error inside isThisCategory Exist',error.message)
        return false
    }
}

module.exports = mongoose.model('Category',category)