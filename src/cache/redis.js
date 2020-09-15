const {
    REDIS_CONF
} = require('../conf/db')
const redis = require('redis')

//创建客户端
const redisClient = redis.createClient(REDIS_CONF)

redisClient.on('error', err => {
    console.log('redis error', err)
})
/**
 * 
 * @param {string} key 
 * @param {string} val 
 * @param {number} timeout 过期时间s
 */
function set(key, val, timeout = 60 * 60) {
    if (typeof val === 'object') {
        val = JSON.stringify(val)
    }
    redisClient.set(key, val)
    redisClient.expire(key, timeout)
}

function get(key) {
    return new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            if (err) {
                reject(err)
                return
            }
            if (val == null) {
                resolve(null)
                return
            } else {
                try {
                    resolve(JSON.parse(val))
                } catch (err) {
                    resolve(val)
                }
            }

        })
    })
}

module.exports = {
    set,
    get
}