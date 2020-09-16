const {
    User,
    UserRelation
} = require('../db/model/index')
const {
    formatUser
} = require('./format')

const Sequelize = require('sequelize')

/**
 * 
 * @param {number} followerId 
 * 获取关注该用户的粉丝列表
 */
async function getUsersByFollower(followerId) {
    const result = await User.findAndCountAll({
        attributes: ['id', 'userName', 'nickName', 'picture'],
        order: [
            ['id', 'desc']
        ],
        include: [{
            model: UserRelation,
            where: {
                followerId,
                userId: {
                    [Sequelize.Op.ne]: followerId
                }
            }
        }]
    })

    //result.count 总数
    //result.rows 查询结果[]

    let userList = result.rows.map(row => row.dataValues)
    userList = formatUser(userList)
    return {
        count: result.count,
        userList
    }
}


async function getFollowersByUser(userId) {
    const result = await UserRelation.findAndCountAll({
        order: [
            ['id', 'desc']
        ],
        include: [{
            model: User,
            attributes: ['id', 'userName', 'nickName', 'picture']
        }],
        where: {
            userId,
            followerId: {
                [Sequelize.Op.ne]: userId
            }
        }
    })
    // result.count 总数
    // result.rows 查询结果 ， 数组
    // userList: 是UserRelation查询之后的结果
    let userList = result.rows.map(row => row.dataValues)

    // userList: 是User查询之后的结果
    userList = userList.map(item => {
        let user = item.user
        user = user.dataValues
        user = formatUser(user)
        return user
    })

    return {
        count: result.count,
        userList
    }
}

/**
 * 
 * @param {number} userId 
 * @param {number} followerId '
 * 添加关注关系
 */
async function addFollower(userId, followerId) {
    const result = await UserRelation.create({
        userId,
        followerId
    })
    return result.dataValues

}

async function deleteFollower(userId, followerId) {
    const result = await UserRelation.destroy({
        where: {
            userId,
            followerId
        }
    })
    return result > 0
}

module.exports = {
    getUsersByFollower,
    getFollowersByUser,
    addFollower,
    deleteFollower
}