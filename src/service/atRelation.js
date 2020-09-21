/**
 * @description: @用户关系service
 */

const {
    AtRelation,
    Blog,
    User
} = require('../db/model/index')
const {
    formatBlog,
    formatUser
} = require('./format')

async function createAtRelation(blogId, userId) {
    const result = await AtRelation.create({
        blogId,
        userId
    })
    return result.dataValues
}
/**
 * 获取@用户的微博数量(未读的)
 * @param {number} userId 
 */
async function getAtRelationCount(userId) {
    const result = await AtRelation.findAndCountAll({
        where: {
            userId,
            isRead: false
        }
    })
    return result.count
}


async function getAtUserBlogList({
    userId,
    pageIndex,
    pageSize = 10
}) {
    const result = await Blog.findAndCountAll({
        limit: pageSize,
        offset: pageSize * pageIndex,
        order: [
            ['id', 'desc']
        ],
        include: [{
            model: AtRelation,
            attributes: ['userId', 'blogId'],
            where: {
                userId
            }
        }, {
            model: User,
            attributes: ['userName', 'nickName', 'picture']
        }]
    })

    let blogList = result.rows.map(row => row.dataValues)
    blogList = formatBlog(blogList)
    blogList = blogList.map(blogItem => {
        blogItem.user = formatUser(blogItem.user.dataValues)
        return blogItem
    })

    return {
        count: result.count,
        blogList
    }
}

async function updateAtRelation({
    newIsRead
}, {
    userId,
    isRead
}) {
    //拼接更新内容
    const updateData = {}
    if (newIsRead) {
        updateData.isRead = newIsRead
    }
    const whereData = {}
    //拼接查询条件
    if (userId) {
        whereData.userId = userId
    }
    if (isRead) {
        whereData.isRead = isRead
    }
    //执行更新
    const result = await AtRelation.update(updateData, {
        where: whereData
    })

    return result[0] > 0
}

module.exports = {
    createAtRelation,
    getAtRelationCount,
    getAtUserBlogList,
    updateAtRelation
}