const path = require('path')
const jsonWebToken = require('jsonwebtoken')
const userServie = require('../service/userService')
const config = require('../config/config')

class UserController {
    constructor() {
        this.count = 0;
        this.register = this.register.bind(this);
    }

    register(req, res) {
        console.log(req.body)
        const {userName} = req.body
        const secretKey = config.secretKey
        const token = jsonWebToken.sign(
            {userName: userName}, 
            secretKey, 
            {expiresIn: '60d',algorithm:"HS256"}
        )
        this.count++;
        res.send({
            status: 1,
            message: `注册用户信息${this.count}`,
            data: {
                token: token,
                userInfo: {
                    userName: userName
                }
            }
        })
    }

    async login(req, res) {
        const {userId} = req.auth;
        const {userName} = req.body;
        try {
            console.log(`userId=${userId}`);
            if (!userId) {
                throw new Error('用户名参数错误')
            }
        } catch (error) {
            res.send({
                status: 0,
                message: error.message,
            })
            return
        }

        try {
            const results = await userServie.findUser(userId)
            res.send({
                status: 1,
                message: '登录成功',
                data: {
                    results: results,
                    userId,
                    userName
                }
            })
        } catch (err) {
            res.send({
                status: 0,
                message: err.message,
            })
        }
        /** 
        userServie.queryStudents(userId)
        .then((results) => {
            res.send({
                status: 1,
                message: '登录成功',
                data: results
            })
        })
        .catch((err) => {
            res.send({
                status: 0,
                message: err.message,
            })
        })
        */
        /** 
        userServie.queryStudents(userId, (err, results) => {
            if (err) {
                res.send({
                    status: 0,
                    message: err.message,
                })
                return
            }
            res.send({
                status: 1,
                message: '登录成功',
                data: results
            })
        });
        */
    }

    modifyUserAvadar(req, res) {
        const imageNames = req.files.map((item) => {
            const imagePathUrl = path.join('/public/upload/images', item.originalname)
            return {
                fileName: imagePathUrl
            }
        })
        // console.log(req.file.filename);
        // const imagePathUrl = path.join('/public/upload/images',req.file.filename) 
        res.send({
            status: 1,
            message: '上传成功',
            data: {
                imagePathArray: imageNames
            }
        })
    }
}
module.exports = new UserController();
/** 
module.exports.register = function(req, res) {
    console.log(req.body)
    res.send('注册用户信息')
}

module.exports.login = function(req, res) {
    const {userId} =  req.body;
    userServie.queryStudents(userId, (err, results) => {
        if (err) {
            res.send({
                status: 0,
                message: err.message,
            })
            return
        }
        res.send({
            status: 1,
            message: '登录成功',
            data: results
        })
    });
    
}
*/