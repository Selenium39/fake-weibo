const {
    getSquareCacheList
} = require("../cache/blog")
const {
    DEFAULT_PAGE_SIZE
} = require("../conf/constant")
const {
    SuccessResult
} = require("../model/Result")

async function getSquareBlogList(pageIndex = 0) {
    const result = await getSquareCacheList(pageIndex, DEFAULT_PAGE_SIZE)
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
    getSquareBlogList
}