const express = require('express')
const userController = require('../controllers/user')

const router = new express.Router()

router.post('/user/register', userController.userRegister);

router.post('/user/login', userController.userLogin)

module.exports = router