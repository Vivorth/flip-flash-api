const express = require('express');

const router = express.Router();

const FlashCardController = require('../controllers/flashcard_controller')
const auth = require('../middlewares/auth')

router.post('/flash_card/add',auth,FlashCardController.addCard );
router.get('/flash_card/get',auth,FlashCardController.getCard) ;
router.patch('/flash_card/favorite/add',auth,FlashCardController.addToFavorite)
router.delete('/flash_card',auth,FlashCardController.deelteAllCard)
router.post('/flash_card/add',FlashCardController.addCard );
router.get('/flash_card/get',FlashCardController.getCard) ;
router.post('/flash_card/update',FlashCardController.updateCard);
router.post('/flash_card/delete',FlashCardController.deleteCard);
router.patch('/flash_card/favorite/add',FlashCardController.addToFavorite)


module.exports = router;