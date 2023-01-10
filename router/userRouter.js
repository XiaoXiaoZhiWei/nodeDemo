const express = require('express')
const userHandler = require('../controller/userController')
const upload = require('../middleware/upload')

const router = express.Router()
// 注册
router.post('/register', userHandler.register)
// 登录
router.post('/login', userHandler.login)
// 修改用户信息
// router.post('/modifyUserAvadar', upload.single('file'),userHandler.modifyUserAvadar)
router.post('/modifyUserAvadar', upload.array('file', 3),userHandler.modifyUserAvadar)

module.exports = router;