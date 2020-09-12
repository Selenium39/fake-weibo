/**
 * 登录校验中间件
 */

const {
    ErrorResult
} = require("../model/Result");
const {
    LOGIN_ERROR,
    UNLOGIN_ERROR
} = require("../model/ErrorInfo");

/**
 * API登录认证
 */
async function loginCheck(ctx, next) {
    if (ctx.session && ctx.session.userInfo) {
        await next()
        return;
    }
    ctx.body = new ErrorResult(UNLOGIN_ERROR)
}

/**
 * 页面登录认证
 */
async function loginRedirect(ctx, next) {
    if (ctx.session && ctx.session.userInfo) {
        await next()
        return;
    }
    const currentUrl = ctx.url
    ctx.redirect('/login?url=' + encodeURIComponent(currentUrl))
}

module.exports = {
    loginCheck,
    loginRedirect
}