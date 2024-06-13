const express = require('express');
const router = express.Router();
const boardController = require('../controllers/board.controller')
const auth = require('../auth/auth');

// router.post('/sign-up', userController.signUp)
// router.post('/sign-in', userController.signIn)
// router.get('/getById/:id', auth, userController.getUserById)
// router.patch('/update/:id', userController.updateUser)
// router.delete('/delete/:id', userController.deleteUser)

router.post('/create', boardController.createBoard)
router.get('/getById/:id', boardController.getBoardById)
router.post('/addImages', boardController.addImages)
router.post('/addUsers', boardController.addUsers)

module.exports = router;