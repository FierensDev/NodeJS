const express = require('express');
const router = express.Router();
const boardController = require('../controllers/board.controller')
const auth = require('../auth/auth');

router.post('/create', boardController.createBoard)
router.get('/getById/:id', boardController.getBoardById)
router.post('/addImages', boardController.addImages)
router.post('/addUsers', boardController.addUsers)
router.delete('/delete/:id', boardController.deleteBoard)

module.exports = router;