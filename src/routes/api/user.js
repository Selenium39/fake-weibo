const router = require('koa-router')()
const {
    isExist,
    register,
    login,
    deleteCurUser,
    changeInfo,
    changePassword,
    logout
} = require('../../controller/user')
const {
    userValidate
} = require('../../validator/user')
const {
    genValidator
} = require('../../middleware/validator')
const {
    loginCheck
} = require('../../middleware/loginChecks')
const {
    isTest
} = require('../../util/env')



router.prefix('/api/user')

router.post('/register', genValidator(userValidate), async (ctx, next) => { //注册需要进行用户数据校验
    const {
        userName,
        password,
        gender
    } = ctx.request.body
    ctx.body = await register({
        userName,
        password,
        gender
    })
})

router.post('/isExist', async (ctx, next) => {
    const {
        userName
    } = ctx.request.body;
    ctx.body = await isExist(userName)

})

router.post('/login', async (ctx, next) => {
    const {
        userName,
        password
    } = ctx.request.body
    ctx.body = await login(ctx, userName, password)
})

router.post('/delete', loginCheck, async (ctx, next) => { //加上登录校验中间件
    if (isTest) {
        //测试环境下，测试账号登录，只能删除自己
        const {
            userName
        } = ctx.session.userInfo
        ctx.body = await deleteCurUser(userName)
    }
})

router.patch('/changeInfo', loginCheck, genValidator(userValidate), async (ctx, next) => {
    const {
        nickName,
        city,
        picture
    } = ctx.request.body
    ctx.body = await changeInfo(ctx, {
        nickName,
        city,
        picture
    })
})

router.patch('/changePassword', loginCheck, genValidator(userValidate), async (ctx, next) => {
    const {
        password,
        newPassword
    } = ctx.request.body
    const {
        userName
    } = ctx.session.userInfo
    ctx.body = await changePassword(userName, password, newPassword)

})

router.post('/logout',loginCheck,async (ctx,next)=>{
    ctx.body = await logout(ctx);
})

module.exports = router