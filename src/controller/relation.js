/**
 * 用户关系
 */

const {
    getUsersByFollower,
    addFollower,
    deleteFollower,
    getFollowersByUser
} = require("../service/relation")
const {
    SuccessResult,
    ErrorResult
} = require("../model/Result")
const {
    FOLLOW_ERROR,
    UN_FOLLOW_ERROR
} = require('../model/ErrorInfo')


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

/**
 * 
 * @param {number} userId 
 * 获取关注人列表
 */
async function getFollowers(userId) {
    const {
        count,
        userList
    } = await getFollowersByUser(userId)

    return new SuccessResult({
        count,
        followersList: userList
    })
}

async function follow(myUserId, curUserId) {
    try {
        const result = await addFollower(myUserId, curUserId)
        return new SuccessResult()
    } catch (err) {
        console.log(err)
        return new ErrorResult(FOLLOW_ERROR)
    }
}

async function unFollow(myUserId, curUserId) {
    const result = await deleteFollower(myUserId, curUserId)
    if (result) {
        return new SuccessResult()
    } else {
        return new ErrorResult(UN_FOLLOW_ERROR)
    }
}

module.exports = {
    getFans,
    getFollowers,
    follow,
    unFollow
}