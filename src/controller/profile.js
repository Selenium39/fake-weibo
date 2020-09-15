/**
 * 个人主页
 */

const {
    getBlogListByUser
} = require("../service/blog")
const {
    DEFAULT_PAGE_SIZE
} = require('../conf/constant')

const {
    SuccessResult
} = require('../model/Result')

async function getProfileBlogList(userName, pageIndex = 0) {
    const result = await getBlogListByUser({
        userName,
        pageIndex,
        pageSize: DEFAULT_PAGE_SIZE
    })
    const blogList = result.blogList

    //拼接返回数据
    return new SuccessResult({
        isEmpty: blogList.length === 0,
        blogList,
        pageSize: DEFAULT_PAGE_SIZE,
        pageIndex,
        count: result.count
    })
}

module.exports = {
    getProfileBlogList
}