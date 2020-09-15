/**
 * 用户关系
 */

const {
    getUsersByFollower
} = require("../service/relation")
const {
    SuccessResult
} = require("../model/Result")

/**
 * 
 * @param {number} userId 
 * 获取用户粉丝列表
 */
async function getFans(userId) {
    const {
        count,
        userList
    } = await getUsersByFollower(userId)
    return new SuccessResult({
        count,
        fansList: userList
    })
}

module.exports = {
    getFans
}