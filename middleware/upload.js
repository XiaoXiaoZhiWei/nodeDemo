const multer = require('multer')
const path = require('path')
const dateFormat = require('dateformat')

const diskStorage = multer.diskStorage({
    destination: (req, file , cb) => {
        cb(null, path.join(__dirname, '../public/upload/images'))
    },
    filename: (req, file , cb) => {
        // 正则匹配后缀名
        let type = file.originalname.replace(/.+\./,'.');
        const now = new Date();
        const date = dateFormat(now, "yyyy-mm-dd hh:MM:ss");
        cb(null, file.fieldname + '-' + date + type)
    }
})
const upload = multer({storage: diskStorage})

module.exports = upload