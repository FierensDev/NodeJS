const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller')

router.post('/sign-up', userController.signUp)
router.post('/sign-in', userController.signIn)
router.get('/getById/:id', userController.getUserById)
router.patch('/update/:id', userController.updateUser)
router.delete('/delete/:id', userController.deleteUser)

module.exports = router;