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
    findUser(studentId) {
        const sqlStr = 'SELECT * FROM users where id = ?'
        return this.queryDB(sqlStr,[studentId])
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

