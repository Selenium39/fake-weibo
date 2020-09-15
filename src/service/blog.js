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
    formatUser,formatBlog
} = require('./format')


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

module.exports = {
    createBlog,
    getBlogListByUser
}