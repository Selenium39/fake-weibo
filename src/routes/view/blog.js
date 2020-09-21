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
const {
    getSquareBlogList
} = require('../../controller/square')
const {
    getFans,
    getFollowers
} = require('../../controller/relation')

const {
    getHomeBlogList
} = require('../../controller/home')

const {
    getAtMeCount,
    getAtMeBlogList,
    markAsRead
} = require('../../controller/at')


//首页
router.get('/', loginRedirect, async (ctx, next) => {
    const userInfo = ctx.session.userInfo
    const {
        id: userId
    } = userInfo

    // 获取第一页数据
    // controller
    const result = await getHomeBlogList(userId)
    const {
        isEmpty,
        blogList,
        pageSize,
        pageIndex,
        count
    } = result.data

    // 获取粉丝
    const fansResult = await getFans(userId)
    const {
        count: fansCount,
        fansList
    } = fansResult.data

    // 获取关注人列表
    const followersResult = await getFollowers(userId)
    const {
        count: followersCount,
        followersList
    } = followersResult.data

    //获取自己被@数量
    const atCountResult = await getAtMeCount(userId)
    const {
        count: atCount
    } = atCountResult.data

    await ctx.render('index', {
        userData: {
            userInfo,
            fansData: {
                count: fansCount,
                list: fansList
            },
            followersData: {
                count: followersCount,
                list: followersList
            },
            atCount
        },
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        }
    })
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

    //获取粉丝
    const fansResult = await getFans(curUserInfo.id)
    const {
        count: fansCount,
        fansList
    } = fansResult.data

    //获取关注人列表
    const followersResult = await getFollowers(curUserInfo.id)
    const {
        count: followersCount,
        followersList
    } = followersResult.data

    //我是否关注了此人
    const amIFollowed = fansList.some(item => { //some函数检测是否有满足条件的item，只要有一个，就立即返回true
        return item.userName === ctx.session.userInfo.userName
    })

    //获取自己被@数量
    const atCountResult = await getAtMeCount(ctx.session.userInfo.id)
    const {
        count: atCount
    } = atCountResult.data

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
            isMe,
            fansData: {
                count: fansCount,
                list: fansList
            },
            followersData: {
                count: followersCount,
                list: followersList
            },
            amIFollowed,
            atCount
        }
    })
})

//广场页面(
router.get('/square', async (ctx, next) => {
    // 获取微博数据，第一页
    const result = await getSquareBlogList(0)
    const {
        isEmpty,
        blogList,
        pageSize,
        pageIndex,
        count
    } = result.data || {}

    await ctx.render('square', {
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        }
    })
})

//atMe
router.get('/at-me', loginRedirect, async (ctx, next) => {
    const {
        id: userId
    } = ctx.session.userInfo

    //获取自己被@数量
    const atCountResult = await getAtMeCount(userId)
    const {
        count: atCount
    } = atCountResult.data

    //获取第一页列表
    const result = await getAtMeBlogList(userId)
    const {
        isEmpty,
        blogList,
        pageSize,
        pageIndex,
        count
    } = result.data

    await ctx.render('atMe', {
        atCount,
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        }
    })
    //标记为已读
    if (atCount > 0) {
        await markAsRead(userId)
    }
})

module.exports = router