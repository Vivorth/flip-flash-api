const Category = require('../models/category')

const addCategory = async(req,res,next) => {
    const categoryName = req.body.categoryName
    const user_id = req.body.user_id
    let newCategory = new Category({
        name : categoryName, 
        user_id : user_id
    })
    newCategory.save().then(created_category => {
        res.status(200).json({
            message : "Category has been added successfully!" ,
            code : "000" ,
            data : {
                category_id : created_category._id,
                category_name : categoryName , 
                flash_card_id_list : []
            }
        })
    })

}

module.exports = {addCategory}