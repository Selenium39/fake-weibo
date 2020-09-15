const {
    getBlogListStr
} = require('../../util/blog')
const {
    getSquareBlogList
} = require('../../controller/square')
const { loginCheck } = require('../../middleware/loginChecks')

const router = require('koa-router')()
router.prefix('/api/square')
// 加载更多
router.get('/loadMore/:pageIndex',loginCheck, async (ctx, next) => {
    let {
        pageIndex
    } = ctx.params
    pageIndex = parseInt(pageIndex) // 转换 number 类型
    const result = await getSquareBlogList(pageIndex)
    // 渲染模板
    result.data.blogListTpl = getBlogListStr(result.data.blogList)

    ctx.body = result
})

module.exports = router