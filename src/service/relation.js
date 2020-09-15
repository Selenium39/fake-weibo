const {
    User,
    UserRelation
} = require('../db/model/index')
const {
    formatUser
} = require('./format')

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
                followerId
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

module.exports = {
    getUsersByFollower
}