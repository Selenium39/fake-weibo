const Sequelize = require('sequelize')
const {
    MYSQL_CONF
} = require('../conf/db')
const {
    isProd,
    isTest
} = require('../util/env')
const {
    host,
    user,
    password,
    database
} = MYSQL_CONF

config = {
    host: host,
    dialect: 'mysql',
}

if (isTest) {
    //测试环境不用打印sql语句
    config.logging = () => {}
}

if (isProd) {
    //线上环境使用连接池
    config.pool = {
        max: 5,
        min: 0,
        idle: 10000
    }
}

const sequelize = new Sequelize(database, user, password, config)

sequelize.authenticate().then((result) => {
    console.log('connect success')
}).catch((err) => {
    console.log('connect error')
});

module.exports = sequelize