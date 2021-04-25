
const express = require('express')
const  userController = require('../controllers/userController')

const router = express.Router()


router.get('/',userController.getAllUsers)

router.get('/user',userController.getUser)

router.post('/add',userController.addUser)

router.post('/deposit/',userController.Depositing)

router.post('/credit/',userController.updatingCredit)

router.post('/withdraw/:id',userController.withdrawCash)

router.post('/transferring/',userController.TransferringCash)

module.exports = router