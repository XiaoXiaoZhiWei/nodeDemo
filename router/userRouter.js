const express = require('express')
const expressJoi = require('@escook/express-joi')
const userHandler = require('../controller/userController')
const upload = require('../middleware/upload')
const userSchma = require('../models/user')

const router = express.Router()
// 注册
router.post('/register', expressJoi(userSchma),userHandler.register)
// 登录
router.post('/login', userHandler.login)
// 修改用户信息
// router.post('/modifyUserAvadar', upload.single('file'),userHandler.modifyUserAvadar)
router.post('/modifyUserAvadar', upload.array('file', 3),userHandler.modifyUserAvadar)

module.exports = router;