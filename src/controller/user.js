const {
    getUserInfo,
    createUser
} = require('../service/user')

const {
    SuccessResult,
    ErrorResult
} = require('../model/Result')

const {
    USER_NO_EXIST,
    USER_ALREADY_EXIST,
    REGISTER_ERROR
} = require('../model/ErrorInfo')

const {
    doCrypto
} = require('../util/crypto')
/**
 * 
 * @param {用户名} userName 
 * @description:用户名是否存在
 */
async function isExist(userName) {
    const userInfo = await getUserInfo(userName)

    if (userInfo) {
        return new SuccessResult(userInfo)
    } else {
        return new ErrorResult(USER_NO_EXIST)
    }
}
/**
 * 
 * @param {String} userName
 * @param {String} password
 * @param {String} gender(1.男性2.女性3.保密)
 */
async function register({
    userName,
    password,
    gender
}) {
    const userInfo = await getUserInfo(userName)
    if (userInfo) {
        return new ErrorResult(USER_ALREADY_EXIST)
    }
    try {
        await createUser({
            userName,
            password: doCrypto(password),
            gender
        })
        return new SuccessResult()
    } catch (error) {
        console.log(error.message, error.stack)
        return new ErrorResult(REGISTER_ERROR)
    }

}

module.exports = {
    isExist,
    register
}