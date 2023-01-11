const UserModel = require('../models/user')
const BaseService = require('./baseService')

class UserService extends BaseService {

    constructor() {
        super()
        this.findUser = this.findUser.bind(this);
    }

    insertUser() {
        new UserModel('')
    }

    // 查找用户
    findUser(userId) {
        const sqlStr = 'SELECT * FROM users where id = ?'
        return this.queryDB(sqlStr,[userId])
    }

    // 判断用户名是否被占用
    async isExistUser(userName) {
        const sqlStr = 'SELECT * FROM users where userName = ?'
        return this.queryDB(sqlStr,[userId])
    }
}


/** 
const queryStudents = function(studentId) {
    const sqlStr = 'SELECT * FROM student where id = ?'
        return new Promise((resolve, reject) => {
            db.query(sqlStr, [studentId], (err, results) => {
                if (err) {
                    reject(err);
                    return
                } 
                resolve(results);
            })
        })
}
*/

/**
const queryStudents = function(studentId, callback) {
    db.query(sqlStr, [studentId], (err, results) => {
        callback(err,results);
    })
}
*/

module.exports = new UserService();

