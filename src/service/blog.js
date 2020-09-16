const {
    Blog,
    User
} = require("../db/model/index")

async function createBlog({
    userId,
    content,
    image
}) {
    const result = await Blog.create({
        userId,
        content,
        image
    })
    return result.dataValues
}

const {
    formatUser,
    formatBlog
} = require('./format')
const UserRelation = require("../db/model/UserRelation")


async function getBlogListByUser({
    userName,
    pageIndex = 0,
    pageSize = 10
}) {
    //拼接查询条件
    const userWhereOpts = {}
    if (userName) {
        userWhereOpts.userName = userName
    }

    //执行查询
    const result = await Blog.findAndCountAll({
        limit: pageSize,
        offset: pageSize * pageIndex,
        order: [
            ['id', 'desc']
        ],
        include: [{ //Blog-->User 联表查询
            model: User,
            attributes: ['userName', 'nickName', 'picture'],
            where: userWhereOpts
        }]
    })
    //result.count 总数
    //result.rows 查询结果 []
    let blogList = result.rows.map(row => row.dataValues) //获取所有Blog数据
    //格式化blog
    blogList = formatBlog(blogList)
    blogList = blogList.map(blogItem => { //获取每条Blog对应的User数据
        let user = blogItem.user.dataValues
        blogItem.user = formatUser(user)
        return blogItem //这里不要忘了return 
    })
    return {
        count: result.count,
        blogList
    }

}

/**
 * 查询关注人的所有微博
 */
async function getFollowersBlogList({
    userId,
    pageIndex = 0,
    pageSize = 10
}) {
    const result = await Blog.findAndCountAll({
        limit: pageSize,
        offset: pageSize * pageIndex,
        order: [
            ['id', 'desc']
        ],
        include: [{
            model: User,
            attributes: ['userName', 'nickName', 'picture'],
        }, {
            model: UserRelation,
            attributes: ['userId', 'followerId'],
            where: {
                userId
            }
        }]
    })

    // 格式化数据
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

module.exports = {
    createBlog,
    getBlogListByUser,
    getFollowersBlogList
}