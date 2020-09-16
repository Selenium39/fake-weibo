const {
    SuccessResult,
    ErrorResult
} = require("../model/Result")

const {
    CREATE_BLOG_ERROR
} = require('../model/ErrorInfo')

const {
    createBlog,
    getFollowersBlogList
} = require("../service/blog")

const xss = require('xss')
const { DEFAULT_PAGE_SIZE } = require("../conf/constant")

async function create({
    userId,
    content,
    image
}) {
    try {
        //创建微博
        const blog = await createBlog({
            userId,
            content: xss(content), //进行xss过滤，防止xss攻击
            image
        })
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