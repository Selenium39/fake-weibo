const {
    getUserInfo,
    createUser,
    deleteUser,
    updateUser
} = require('../service/user')

const {
    SuccessResult,
    ErrorResult
} = require('../model/Result')

const {
    USER_NO_EXIST,
    USER_ALREADY_EXIST,
    REGISTER_ERROR,
    LOGIN_ERROR,
    UPDATE_USER_ERROR,
    UPDATE_PASSWORD_ERROR
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

async function login(ctx, userName, password) {
    const userInfo = await getUserInfo(userName, doCrypto(password))
    if (!userInfo) {
        return new ErrorResult(LOGIN_ERROR)
    }
    if (ctx.session.userInfo == null) {
        ctx.session.userInfo = userInfo
    }
    return new SuccessResult()
}

async function deleteCurUser(userName) {
    const result = deleteUser(userName)
    if (result) {
        return new SuccessResult()
    }
    return new ErrorResult(USER_NO_EXIST)
}

async function changeInfo(ctx, {
    nickName,
    city,
    picture
}) {
    const {
        userName
    } = ctx.session.userInfo
    if (!nickName) {
        nickName = userName
    }
    const result = await updateUser({
        newNickName: nickName,
        newCity: city,
        newPicture: picture
    }, {
        userName
    })
    if (result) {
        //更新成功，修改session中的userInfo
        Object.assign(ctx.session.userInfo, {
            nickName,
            city,
            picture
        })
        return new SuccessResult()
    }
    return new ErrorResult(UPDATE_USER_ERROR)
}

async function changePassword(userName, password, newPassword) {
    const result = await updateUser({
        newPassword: doCrypto(newPassword)
    }, {
        userName,
        password: doCrypto(password)
    })
    if (result) {
        return new SuccessResult()
    }
    return new ErrorResult(UPDATE_PASSWORD_ERROR)
}

async function logout(ctx) {
    delete ctx.session.userInfo
    return new SuccessResult()
}


module.exports = {
    isExist,
    register,
    login,
    deleteCurUser,
    changeInfo,
    changePassword,
    logout
}