const express = require('express');

const router = express.Router();

const FlashCardController = require('../controllers/flashcard_controller')
const auth = require('../middlewares/auth')

router.post('/flash_card/add',FlashCardController.addCard );
router.get('/flash_card/get',FlashCardController.getCard) ;
router.patch('/flash_card/favorite/add',FlashCardController.addToFavorite)


module.exports = router;