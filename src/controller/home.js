const {
    SuccessResult,
    ErrorResult
} = require("../model/Result")

const constant = require('../conf/constant')

const {
    CREATE_BLOG_ERROR
} = require('../model/ErrorInfo')

const {
    createBlog,
    getFollowersBlogList
} = require("../service/blog")

const {
    getUserInfo
} = require('../service/user')

const xss = require('xss')
const {
    DEFAULT_PAGE_SIZE
} = require("../conf/constant")
const user = require("../service/user")
const {
    createAtRelation
} = require("../service/atRelation")

async function create({
    userId,
    content,
    image
}) {
    //分析并收集content中的@用户
    //''hello @nickName - userName 你好'
    const atUserNameList = []
    content = content.replace(constant.REG_FOR_AT_WHO, (matchStr, nickName, userName) => {
        //目的不是替换字符串，而是从content中获取nickName
        atUserNameList.push(userName)
        return matchStr
    })

    //通过@用户名查询用户信息
    const atUserList = await Promise.all( //所有Promise执行完毕后才会执行
        atUserNameList.map(userName => getUserInfo(userName))
    )

    //根据用户信息，获取用户id
    const atUserIdList = atUserList.map(user => user.id)

    try {
        //创建微博
        const blog = await createBlog({
            userId,
            content: xss(content), //进行xss过滤，防止xss攻击
            image
        })

        //创建@关系
        await Promise.all(atUserIdList.map(userId =>
            createAtRelation(blog.id, userId)
        ))

        return new SuccessResult(blog)
    } catch (err) {
        console.error(err.message, err.stack)
    }
    return new ErrorResult(CREATE_BLOG_ERROR)
}

/**
 * 
 * @param {number} userId 
 * @param {number} pageIndex 
 * 获取首页微博列表
 */
async function getHomeBlogList(userId, pageIndex = 0) {
    // service
    const result = await getFollowersBlogList({
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

module.exports = {
    create,
    getHomeBlogList
}