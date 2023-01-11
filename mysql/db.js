const mysql = require('mysql')

const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '19920721@Zhi',
})

const pool = mysql.createPool({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '19920721@Zhi',
    database: 'nodeDemo'
})
// 创建数据库：nodeDemo
const createDBSQL = `create database if not exists nodeDemo default charset utf8 collate utf8_general_ci`
const createDB = function () {
    return new Promise((resolve, reject) => {
        connection.query(createDBSQL, (err, results) => {
            if (err) {
                reject(err)
            } else {
                resolve(results);
            }
        })
    })
}

/// 创建用户表：users
const createUserTableSql = `create table if not exists users (
    id int not null primary key auto_increment comment '用户ID',
    userName varchar(100) not null comment '用户名',
    password varchar(100) not null comment '用户密码',
    avatarUrl varchar(255) comment '用户图像',
    email varchar(255) comment '邮箱',
    phone varchar(255) comment '手机号',
    gender int not null default 0 comment '用户性别',
    openId varchar(255),
    sessionKey varchar(255),
    createdTime datetime not null,
    updatedTime datetime
)`
const ceateUserTable = function() {
    return new Promise((resolve, reject) => {
        pool.query(createUserTableSql, (err, results) => {
            if (err) {
                reject(err)
            } else {
                resolve(results);
            }
        })
    })
}

// 创建留言墙（留言、照片）
const createWallsTableSql = `create table if not exists walls (
    id int not null primary key auto_increment,
    type int not null comment '0信息1图片',
    message text comment '留言',
    imageUrl varchar(100) comment '图片路径',
    lable int not null comment '标签',
    color int not null comment '背景色',
    userName varchar(100) not null comment '用户名',
    userId int not null comment '用户ID',
    createTime datetime not null comment '创建时间'
)`
const createWallsTable = function() {
    return new Promise((resolve, reject) => {
        pool.query(createWallsTableSql, (err, results) => {
            if (err) {
                reject(err)
            } else {
                resolve(results);
            }
        })
    })
}

const updateWallsSql = `alter table walls 
modify color varchar(100) not null comment '背景色'`;
const updateWallsTable = function() {
    return new Promise((resolve, reject) => {
        pool.query(updateWallsSql, (err, results) => {
            if (err) {
                reject(err)
            } else {
                resolve(results);
            }
        })
    })
}

const db = async function() {
    try {
        await createDB()
        await ceateUserTable()
        await createWallsTable() 

        await updateWallsTable()
    } catch (error) {
        console.log(error.message)
    }
}
db();

module.exports = pool