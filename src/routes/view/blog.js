/**
 * 微博view路由
 */

const router = require('koa-router')()
const {
    loginRedirect
} = require('../../middleware/loginChecks')
const {
    getProfileBlogList
} = require('../../controller/profile')

//首页
router.get('/', loginRedirect, async (ctx, next) => {
    await ctx.render('index', {})
})

//个人主页
router.get('/profile', loginRedirect, async (ctx, next) => {
    const {
        userName
    } = ctx.session.userInfo
    ctx.redirect(`profile/${userName}`)
})

//其他人主页
router.get('/profile/:userName', loginRedirect, async (ctx, next) => {
    const {
        userName: curUserName
    } = ctx.params
    //获取微博第一页数据
    const result = await getProfileBlogList(curUserName, 0)
    const {
        isEmpty,
        blogList,
        pageSize,
        pageIndex,
        count
    } = result

    await ctx.render('profile', {
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        }
    })
})

module.exports = router