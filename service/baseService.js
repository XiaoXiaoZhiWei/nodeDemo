const db = require('../mysql/db')

class BaseService {

    queryDB(sql, data) {
        return new Promise((resolve, reject) => {
            db.query(sql, data, (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results);
                }
            })
        })
    }
}

module.exports = BaseService