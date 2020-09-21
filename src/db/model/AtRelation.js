/**
 * @用户关系模型
 */
const seq = require('../seq')
const {
    INTEGER,
    BOOLEAN
} = require('../types')

const AtRelation = seq.define('atRelation', {
    userId: {
        type: INTEGER,
        allowNull: false,
        comment: '用户Id'
    },
    blogId: {
        type: INTEGER,
        allowNull: false,
        comment: '微博Id'
    },
    isRead: {
        type: BOOLEAN,
        allowNull: false,
        defaultValue: false, //默认未读
        comment:'是否已读'
    }
})

module.exports = AtRelation