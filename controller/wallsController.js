const wallsService = require('../service/wallsService')
const joi = require('joi')
const lodash = require('lodash')

class WallsController {

    // 发布照片墙
    async publishWalls(req, res) {
        const {type,message,lable,color,userName,userId, imageUrl} = req.body;
        console.log(`type=${type}`);
        const schema = joi.object({
            type: joi.number().required().min(0).max(1).error(new Error('type必须为0或1')),
            message: joi.string().error(new Error('message必须为string')),
            imageUrl: joi.string().error(new Error('imageUrl必须为string')),
            lable: joi.number().required().error(new Error('lable不符合规则')),
            color: joi.string().required().pattern(new RegExp('^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$')).error(new Error('color不符合规则')),
            userName: joi.string().required().error(new Error('userName不符合规则')),
            userId: joi.number().required().error(new Error('userId不符合规则')),
        })
        try {
            await schema.validateAsync(req.body)
        } catch (error) {
            res.send({
                status: 0,
                message: error.message
            })
            return
        }
        
        try {
            if (type === 0) {
                if (!message) {
                    throw new Error('message不能为空')
                }
            } else if (type === 1) {
                if (!imageUrl) {
                    throw new Error('imageUrl不能为空')
                }
            }
        } catch (error) {
            res.send({
                status: 0,
                message: error.message
            })
            return
        }
        
        try {
            const wall = {
                type,
                message,
                lable,
                color,
                userName,
                userId,
                imageUrl
            }
            const wallRecord = await wallsService.insertWalls(wall);
            res.send({
                status: 1,
                message: '留言成功',
                data: wall
            });
        } catch (error) {
            res.send({
                status: 0,
                message: error.message
            })
        }
    }

    // 获取照片墙详情
    async queryWallDetail(req, res) {
        const {wallId} = req.query;
        const schema = joi.object({
            wallId: joi.number().required().error(new Error('wallId必须有值'))
        })
        try {
            await schema.validateAsync({wallId})
        } catch (error) {
            res.send({
                status: 0,
                message: error.message
            })
            return
        }
        try {
            const results = await wallsService.queryWallDetail(wallId)
            const wall = lodash.first(results);
            console.log(`wall=${wall}`);
            res.send({
                status: 1,
                message: '照片墙详情成功',
                data: wall === undefined ? {} : wall
            });
        } catch (error) {
            res.send({
                status: 0,
                message: error.message
            })
        }
    }

    // 获取照片墙列表
    async queryWallList(req, res) {
        const condition = req.body;
        const schema = joi.object({
            page: joi.number().min(1).required().error(new Error('page必须有值')),
            rows: joi.number().integer().min(1).required().error(new Error('rows必须有值')),
            lable: joi.number().error(new Error('lable值有错误'))
        })
        try {
            await schema.validateAsync(condition)
        } catch (error) {
            res.send({
                status: 0,
                message: error.message
            })
            return
        }
        try {
            const results = await wallsService.queryWallList(condition);
            res.send({
                status: 1,
                message: '照片墙列表成功',
                data: results
            });
        } catch (error) {
            res.send({
                status: 0,
                message: error.message
            })
        }
    }
}

module.exports = new WallsController();