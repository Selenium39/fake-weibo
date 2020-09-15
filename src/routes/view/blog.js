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

const {
    isExist
} = require('../../controller/user')

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
    //是否是自己
    const isMe = curUserName === ctx.session.userInfo.userName
    let curUserInfo
    if (isMe) {
        curUserInfo = ctx.session.userInfo
    } else {
        //查看用户是不是数据库中存在用户
        const existResult = await isExist(curUserName)
        if (existResult.errCode !== 0) {
            return
        }
        //从数据库中取出用户信息
        curUserInfo = existResult.data

    }
    //获取微博第一页数据
    const result = await getProfileBlogList(curUserName, 0)
    const {
        isEmpty,
        blogList,
        pageSize,
        pageIndex,
        count
    } = result.data
    await ctx.render('profile', {
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        },
        userData: {
            userInfo: curUserInfo,
            isMe
        }
    })
})

module.exports = router