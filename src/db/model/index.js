/**
 * @description：数据模型入口文件
 */

const User = require('./User')
const Blog = require('./Blog')
const UserRelation = require('./UserRelation')
const AtRelation = require('./AtRelation')

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

Blog.belongsTo(UserRelation, {  //userId-->followerId
    foreignKey: 'userId',
    targetKey: 'followerId'  
})

Blog.hasMany(AtRelation,{
    foreignKey:'blogId'
})

// User->Blog
// User.hasMany(Blog) 

module.exports = {
    User,
    Blog,
    UserRelation,
    AtRelation
}