/**
 * 数据校验中间件
 */

const {
    ErrorResult
} = require('../model/Result')
const {
    VALIDATE_ERROR
} = require('../model/ErrorInfo')

function genValidator(validateFunc) {
    return async function validator(ctx, next) {
        const error = validateFunc(ctx.request.body)
        if (error) {
            console.log('数据校验失败')
            //校验失败
            ctx.body = new ErrorResult(VALIDATE_ERROR)
            return
        }
        await next()
    }
}

module.exports = {
    genValidator
}