const express = require('express')
const wallsHandler = require('../controller/wallsController')
const router = express.Router()

// 发布留言
router.post('/publishWalls', wallsHandler.publishWalls)
// 获取列表
router.post('/list', wallsHandler.queryWallList)
// 获取详情
router.get('/detail', wallsHandler.queryWallDetail)

module.exports = router;