const Category = require('../models/category')

const addCategory = async(req,res,next) => {
    const category_name = req.body.category_name
    const user_id = req.body.user_id
    let newCategory = new Category({
        name : category_name, 
        user_id : user_id
    })
    newCategory.save().then(created_category => {
        res.status(200).json({
            message : "Category has been added successfully!" ,
            code : "000" ,
            data : {
                category_id : created_category._id,
                category_name : category_name , 
                flash_card_id_list : []
            }
        })
    }).catch(err => {
        res.status(500).json({
            message : err
        })
    })


}

const getCategory = async(req,res) => {
    await Category.find({}).then(function(categories){
        res.status(200).json({
            message : "Fetch category successfully!" ,
            code : "000" ,
            data : categories
        })
    }).catch(err =>{
        res.send(err)
    })

}

const updateCategory = async(req, res) => {
    var query = {_id: req.body.category_id}
    var dataTobeUpdated = {$set:{
        category_name: req.body.category_name
    }}
    await Category.findOneAndUpdate(
        query,
        dataTobeUpdated
    ).then(updatedCategory => {
        res.status(200)
        .json({
            message: "Category has been updated successfully.",
            data: updatedCategory
            
        })
    })
    .catch(err =>{
        res.send(err)
    })
}

const deleteCategory = async(req, res) => {
    const categoryId = req.body.category_id
    await Category.findByIdAndDelete(
        categoryId
    ).then(deletedCategory =>{
        res.status(200)
        .json({
            message: "Category has been deleted successfully.",
            data: {
            }
        })
    })
    .catch(err => {
        res.status(500).json({err})
    })
}

module.exports = {addCategory, updateCategory, deleteCategory, getCategory}