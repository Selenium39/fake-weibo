/**
 * 首页AIP路由
 */

const router = require('koa-router')()
const {
    loginCheck
} = require('../../middleware/loginChecks')
const {
    create
} = require('../../controller/home')

router.prefix('/api/blog')

router.post('/create', loginCheck, async (ctx, next) => {
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

module.exports = router