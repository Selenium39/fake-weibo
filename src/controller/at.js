/**
 * @description:@关系controller
 */
const {
    getAtRelationCount,
    getAtUserBlogList,
    updateAtRelation
} = require('../service/atRelation')
const {
    SuccessResult,
    ErrorResult
} = require("../model/Result")
const {
    DEFAULT_PAGE_SIZE
} = require('../conf/constant')

async function getAtMeCount(userId) {
    const count = await getAtRelationCount(userId)
    return new SuccessResult({
        count
    })
}

async function getAtMeBlogList(userId, pageIndex = 0) {
    const result = await getAtUserBlogList({
        userId,
        pageIndex,
        pageSize: DEFAULT_PAGE_SIZE
    })
    const {
        count,
        blogList
    } = result

    // 返回
    return new SuccessResult({
        isEmpty: blogList.length === 0,
        blogList,
        pageSize: DEFAULT_PAGE_SIZE,
        pageIndex,
        count
    })
}

/**
 * 
 * @param {标记为已读} userId 
 */
async function markAsRead(userId) {
    try {
        await updateAtRelation({
            newIsRead: true
        }, {
            userId,
            isRead: false
        })
    } catch (ex) {
        console.error(ex)
    }
}


module.exports = {
    getAtMeCount,
    getAtMeCount,
    getAtMeBlogList,
    markAsRead
}