const { request } = require('express')
// Not yet handle duplicate
const FlashCard = require('../models/flash_card.')
const Category = require('../models/category')
const User = require('../models/user')
const {getUserById} = require('./user_controller')
const addCard = async(req,res) =>{
    // find category by id 
    try {
    const userId = req.user.id
    const category_name = req.body.category_name
    console.log(category_name)
    const category = await Category.find({user_id : userId,category_name:category_name})
    console.log(category)
    const category_id = category[0]._id
        let allCards = []
        const allTitle = req.body.title
        const allExplanation = req.body.explanation 
        const allSaved = req.body.isSaved
        const allColor = req.body.color
        console.log(allTitle)
        for(let i =0 ; i<allTitle.length ;i ++){

            const newCard = {title  : allTitle[i],
                             explanation : allExplanation[i],
                             category_id : category_id,
                             isSaved : allSaved[i]
                            }

            allCards.push(newCard) ; 
        }
            

        await FlashCard.insertMany(allCards)
        .then( function(results){
            results.map(async (result)=>{
                console.log("Result",result)
                await Category.findByIdAndUpdate({_id : category_id},{$push : {flash_card_id_list : result._id}})             
            })
            res.status(200).json({
                message : "Add Card Success",
                splash_cards : results
            })
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({error : err})
        })
    
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message : error
        })
    } 
   
}

const getCard = async (req,res)=>{
    await FlashCard.find({}).then(card =>{
        res.status(200).json({
            message : "Fetch card sucessfuly",
            data : card
        })
    }).catch(err => {
        res.status(500).json({err})
    })
}


const updateCard = async (req, res) => {
    var query = {_id: req.body.flash_card_id}
    var dataTobeUpdated = {$set:{
        title: req.body.title,
        explanation: req.body.explanation,
        color: req.body.color
    }}

    await FlashCard.findOneAndUpdate(
        query,
        dataTobeUpdated
    ).then(updatedCard => {
        res.status(200).json({
            message : "Updated sucessfuly",
            data : updatedCard
        })
    })
    .catch(err => {
        res.status(500).json({err})
    })
}

const deleteCard = async (req, res) => {
    const flash_card_id = req.body.flash_card_id
    await FlashCard.findByIdAndDelete(
        flash_card_id
    ).then(deletedFlashCard => {
        res.status(200).json({
            message : "Deleted sucessfuly",
            data : deletedFlashCard
        })
    })
    .catch(err => {
        res.status(500).json({err})
    })
}

// Not yet fix 
const addToFavorite = async (req,res) =>{
    const id = req.body.id 
    FlashCard.findByIdAndUpdate(id , {isSaved : true} , function(err,docs){
        if(err) {
            res.status(500).json({
                message : err
            })
        }else{
            res.status(200).json({
                message : 'Updated Sucessful',
                data : docs
            })
        }
    })
}

const deelteAllCard = async(req,res) => {
    await FlashCard.deleteMany({}).then(function() {
        res.send({message : "All Data Deleted"})
    }).catch(err => {
        res.send(err)
    })
}

// deleteFlashCard
// const deleteCardbyName = async(req,res) => {
//     const user_id = req.user.id
//     let card_name = req.path
//     card_name = flash_card.slice(1) // remove '/' in path
//     FlashCard.delete({})
// }
//Update flash card

module.exports = {addCard,getCard, updateCard, deleteCard,addToFavorite, deelteAllCard}