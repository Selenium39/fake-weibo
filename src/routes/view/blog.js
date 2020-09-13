/**
 * 微博view路由
 */

const router = require('koa-router')()
const {
    loginRedirect
} = require('../../middleware/loginChecks')

//首页
router.get('/', loginRedirect, async (ctx, next) => {
    await ctx.render('index', {})
})

module.exports = router