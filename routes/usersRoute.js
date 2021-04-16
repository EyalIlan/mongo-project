const { static } = require('express')
const express = require('express')
const  userController = require('../controllers/userController')

const router = express.Router()



router.get('/',userController.getAllUsers)

router.get('/user/:id',userController.getUser)


router.post('/add',userController.addUser)

router.post('/deposit/:id',userController.Depositing)

router.post('/credit/:id',userController.updatingCredit)

router.post('/withdraw/:id',userController.withdrawCash)

router.post('/transferring/:id1/:id2',userController.TransferringCash)

module.exports = router