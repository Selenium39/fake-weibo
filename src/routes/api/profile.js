/**
 * 个人主页API路由
 */
const {
    loginCheck
} = require('../../middleware/loginChecks')
const {
    getProfileBlogList
} = require('../../controller/profile')
const {
    getBlogListStr
} = require('../../util/blog')
const {
    follow,
    unFollow
} = require('../../controller/relation')
const router = require('koa-router')()
router.prefix('/api/profile')

//加载更多
router.get('/loadMore/:userName/:pageIndex', loginCheck, async (ctx, next) => {
    let {
        userName,
        pageIndex
    } = ctx.params
    pageIndex = parseInt(pageIndex)
    const result = await getProfileBlogList(userName, pageIndex)
    //渲染为html模板
    result.data.blogListTpl = getBlogListStr(result.data.blogList)

    ctx.body = result
})

//关注
router.post('/follow', loginCheck, async (ctx, next) => {
    const {
        id: myUserId
    } = ctx.session.userInfo
    const {
        userId: curUserInd
    } = ctx.request.body
    ctx.body = await follow(myUserId, curUserInd)
})

//取消关注
router.post('/unFollow', loginCheck, async (ctx, next) => {
    const {
        id: myUserId
    } = ctx.session.userInfo
    const {
        userId: curUserInd
    } = ctx.request.body
    ctx.body = await unFollow(myUserId, curUserInd)
})


module.exports = router