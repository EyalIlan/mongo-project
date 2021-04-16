const { static } = require('express')
const express = require('express')
const  userController = require('../controllers/userController')

const router = express.Router()



router.post('/add',userController.addUser)

router.post('/deposit/:id',userController.Depositing)

router.post('/credit/:id',userController.updatingUser)

router.post('/withdraw/:id',userController.withdrawCash)

router.post('/transferring/:id1/:id2',userController.TransferringCash)

module.exports = router