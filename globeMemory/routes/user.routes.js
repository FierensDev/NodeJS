const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller')
const auth = require('../auth/auth');

router.post('/sign-up', userController.signUp)
router.post('/sign-in', userController.signIn)
router.get('/getById/:id', auth, userController.getUserById)
router.patch('/update/:id', userController.updateUser)
router.delete('/delete/:id', userController.deleteUser)
router.get('/getByFirstnameAndLastName/:query', userController.getByFirstnameAndLastName)

module.exports = router;