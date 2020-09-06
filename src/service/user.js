const {
    User
} = require('../db/model/index')

const {
    formatUser
} = require('./format')

async function getUserInfo(userName, password) {
    let whereOpt = {
        userName
    }
    if (password) {
        Object.assign(whereOpt, {
            password
        })
    }
    const result = await User.findOne({
        attributes: ['id', 'userName', 'nickName', 'picture', 'city'],
        where: whereOpt
    })
    if (result == null) {
        return result
    }

    return formatUser(result.dataValues)
}

async function createUser({
    userName,
    password,
    gender = 3,
    nickName
}) {
    const result = await User.create({
        userName,
        password,
        nickName: nickName ? nickName : userName,
        gender
    })
    return result.dataValues
}

module.exports = {
    getUserInfo,
    createUser
}