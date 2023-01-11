const joi = require('joi')

/**
 * string() 值必须是字符串
 * alphanum() 值只能是包含 a-zA-Z0-9 的字符串
 * min(length) 最小长度
 * max(length) 最大长度
 * required() 值是必填项，不能为 undefined
 * pattern(正则表达式) 值必须符合正则表达式的规则
 */
const UserSchma = {
    userName: joi.string().required().min(1).max(10),
    password: joi.string().required().min(6).max(10),
    avatarUrl: joi.string(),
    email: joi.string().email(),
    phone: joi.string().pattern(new RegExp('^[1][3,5,7,8][0-9]\\d{8}$')),
    gender: joi.number().integer(),
    openId: joi.string(),
    sessionKey: joi.string(),
    createdTime: joi.date(),
    updatedTime: joi.date()
}

module.exports = {
    body: UserSchma
};