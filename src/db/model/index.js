/**
 * @description：数据模型入口文件
 */

const User = require('./User')
const Blog = require('./Blog')
const UserRelation = require('./UserRelation')

//User一对多Blog Blog-->User
Blog.belongsTo(User, {
    foreignKey: 'userId'
})

UserRelation.belongsTo(User, {
    foreignKey: 'followerId'
})
User.hasMany(UserRelation, {
    foreignKey: 'userId'
})

// User->Blog
// User.hasMany(Blog) 

module.exports = {
    User,
    Blog,
    UserRelation
}