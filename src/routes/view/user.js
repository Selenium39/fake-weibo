const {
    loginRedirect
} = require('../../middleware/loginChecks')

/**
 * @description 用户路由
 */
const router = require('koa-router')()

function getLoginInfo(ctx) { //已登录的情况下自动登录
    let data = {
        isLogin: false //默认未登录
    }
    const userInfo = ctx.session.userInfo
    if (userInfo) {
        data = {
            isLogin: true,
            userName: userInfo.userName
        }
    }
    return data
}

router.get('/login', async (ctx, next) => {
    await ctx.render('login', getLoginInfo(ctx))
})
router.get('/register', async (ctx, next) => {
    await ctx.render('register', getLoginInfo(ctx))
})
router.get('/setting', loginRedirect, async (ctx,next) => {
    await ctx.render('setting', ctx.session.userInfo)
})

module.exports = router