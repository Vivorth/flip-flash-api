const express = require('express');

const router = express.Router();

const FlashCardController = require('../controllers/flashcard_controller')
const auth = require('../middlewares/auth')

router.post('/add',auth,FlashCardController.addCard );
router.get('/get',auth,FlashCardController.getCard) ;
router.patch('/favorite/add',auth,FlashCardController.addToFavorite)
router.delete('',auth,FlashCardController.deelteAllCard)
// router.delete('/:name',auth,FlashCardController.deleteCardbyName)


module.exports = router;