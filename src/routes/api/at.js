const router = require('koa-router')()
const { loginCheck } = require('../../middleware/loginChecks')
const { getAtMeBlogList } = require('../../controller/at')
const { getBlogListStr } = require('../../util/blog')

router.prefix('/api/atMe')

// 加载更多
router.get('/loadMore/:pageIndex', loginCheck, async (ctx, next) => {
    let { pageIndex } = ctx.params
    pageIndex = parseInt(pageIndex)  // 转换 number 类型
    const { id: userId } = ctx.session.userInfo
    const result = await getAtMeBlogList(userId, pageIndex)
    // 渲染模板
    result.data.blogListTpl = getBlogListStr(result.data.blogList)
    ctx.body = result
})

module.exports = router