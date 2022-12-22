const { request } = require('express')
const FlashCard = require('../models/flash_card.')

const addCard = async(req,res) =>{
    let newCard = new FlashCard({
        title : req.body.title , 
        explanation : req.body.explanation,
        category_id : req.body.category_id , 
        isSaved : req.body.isSaved
    })
    await newCard.save().then(createdCard => { 
        res.status(200).json({
            message : "Card add successful" ,
            splash_cards : createdCard
        })
    })
    .catch(error =>{
        res.status(500).json({
            message : error
        })
    })
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

module.exports = {addCard,getCard,updateCard,deleteCard,addToFavorite}