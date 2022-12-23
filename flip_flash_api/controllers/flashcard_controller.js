const FlashCard = require('../models/flash_card.')
const Category = require('../models/category')

const addCard = async(req,res) =>{
    let newCard = new FlashCard({
        title : req.body.title , 
        explanation : req.body.explanation,
        category_id : req.body.name , 
        isSaved : req.body.isSaved
    })
    await newCard.save().then(createdCard => {
        Category 
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

module.exports = {addCard,getCard,addToFavorite}