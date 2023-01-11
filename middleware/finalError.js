const multer = require('multer')
const joi = require('joi')

const errorMiddle = function (err, req, res, next) {
    if (err instanceof multer.MulterError) {
        res.send({
            status: 0,
            message: '文件上传错误：' + err.message
        })
    } else if (err.name === 'UnauthorizedError') {
        res.send({
            status: 0,
            message: 'token错误：' + err.message
        })
    } else if (err instanceof joi.ValidationError) {
        res.send({
            status: 0,
            message: '数据验证失败：' + err.message
        })
    } else if (err) {
        res.send({
            status: 0,
            message: err.message
        })
    }
    next();
}
module.exports = errorMiddle