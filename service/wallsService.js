const dateFormat = require('dateformat')
const BaseService = require('./baseService')

class WallsService extends BaseService {

    constructor() {
        super()
        this.insertWalls = this.insertWalls.bind(this);
        this.queryWallDetail = this.queryWallDetail.bind(this);
        this.queryWallList = this.queryWallList.bind(this);
    }

    insertWalls(wall) {
        // id int not null primary key auto_increment,
        // type int not null comment '0信息1图片',
        // message text comment '留言',
        // imageUrl varchar(100) comment '图片路径',
        // lable int not null comment '标签',
        // color int not null comment '背景色',
        // userName varchar(100) not null comment '用户名',
        // userId int not null comment '用户ID',
        // createTime datetime not null comment '创建时间'
        
        const now = new Date();
        const createTime = dateFormat(now, "yyyy-mm-dd hh:MM:ss");
        wall.createTime = createTime
        const insertSql = `insert into walls set ?`
        return this.queryDB(insertSql, wall)
    }

    queryWallDetail(wallId) {
        const queryWallByIdSql = `select * from walls where id = ?`
        return this.queryDB(queryWallByIdSql, [wallId])
    }

    queryWallList(condition) {
        const {page, rows, lable} = condition
        const conditionSql = this.buildSearchConditions(condition)
        const queryWallListSql = conditionSql.sql;
        return this.queryDB(queryWallListSql,conditionSql.values)
    }

    buildSearchConditions(condition) {
        const {page, rows, lable} = condition
        var conditions = [];
        var values = []

        conditions.push('select * from walls');

        if (typeof(lable) !== 'undefined') {
            const whereSql = 'where lable = ?'
            conditions.push(whereSql);
            values.push(lable)
        }

        const orderSql = 'order by createTime desc'
        conditions.push(orderSql);

        const pageSql = 'limit ?,?'
        conditions.push(pageSql);
        const offset = (page - 1) * rows;
        values.push(offset)
        values.push(rows)

        return {
            sql: conditions.length > 0 ? conditions.join(" ") : conditions,
            values: values
        }
    }
}

module.exports = new WallsService();