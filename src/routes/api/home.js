/**
 * 首页AIP路由
 */

const router = require('koa-router')()
const {
    blogValidate
} = require('../../validator/blog')
const {
    genValidator
} = require('../../middleware/validator')
const {
    loginCheck
} = require('../../middleware/loginChecks')
const {
    create,
    getHomeBlogList
} = require('../../controller/home')
const {
    getBlogListStr
} = require('../../util/blog')

router.prefix('/api/blog')

router.post('/create', loginCheck, genValidator(blogValidate), async (ctx, next) => {
    const {
        content,
        image
    } = ctx.request.body
    const {
        id: userId //将id起别名为userId
    } = ctx.session.userInfo
    ctx.body = await create({
        userId,
        content,
        image
    })
})

// 加载更多
router.get('/loadMore/:pageIndex', loginCheck, async (ctx, next) => {
    let {
        pageIndex
    } = ctx.params
    pageIndex = parseInt(pageIndex) // 转换 number 类型
    const {
        id: userId
    } = ctx.session.userInfo
    const result = await getHomeBlogList(userId, pageIndex)
    // 渲染模板
    result.data.blogListTpl = getBlogListStr(result.data.blogList)

    ctx.body = result
})

module.exports = router