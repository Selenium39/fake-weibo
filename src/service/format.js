/**
 * @description:数据格式化
 */

const constant = require('../conf/constant')

/**
 * 
 * @param {Object} obj
 * @description:用户默认头像 
 */
function formatUserPicture(obj) {
    if (obj.picture == null) {
        obj.picture = constant.DEFAULT_PICTURE
    }
    return obj
}

/**
 * @description:格式化用户信息
 * @param {Array|Object} list 
 */
function formatUser(list) {
    if (list == null) {
        return list
    }
    if (list instanceof Array) {
        return list.map(formatUserPicture)
    }
    return formatUserPicture(list)
}

module.exports = {
    formatUser
}