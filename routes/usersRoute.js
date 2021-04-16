const { static } = require('express')
const express = require('express')
const  userController = require('../controllers/userController')

const router = express.Router()



router.post('/add',userController.addUser)

router.post('/deposit/:id',userController.Depositing)

module.exports = router