const {
    isProd
} = require('../util/env')

let MYSQL_CONF = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: '123456',
    database: 'fake_weibo'
}

let REDIS_CONF = {
    host: 'localhost',
    port: '6379',
    password: '123456'

}

if (isProd) {
    //生产环境配置
}

module.exports = {
    MYSQL_CONF,
    REDIS_CONF
}