/**
 * @description:数据格式化
 */

const constant = require('../conf/constant')
const {
  timeFormat
} = require('../util/dt')

/**
 * 
 * @param {Object} obj
 * @description:用户默认头像 
 */
function formatUserPicture(obj) {
  if (obj.picture == null) {
    obj.picture = constant.DEFAULT_PICTURE
  }
  return obj
}

/**
 * @description:格式化用户信息
 * @param {Array|Object} list 
 */
function formatUser(list) {
  if (list == null) {
    return list
  }
  if (list instanceof Array) {
    return list.map(formatUserPicture)
  }
  return formatUserPicture(list)
}

/**
 * 格式化数据的时间
 * @param {Object} obj 时间
 */
function formatDBTime(obj) {
  // obj.createdAt sequlize数据库 自己建好的时间
  obj.createdAtFormat = timeFormat(obj.createdAt)
  obj.updatedAtFormat = timeFormat(obj.updatedAt)
  return obj
}

/**
 * 
 * 格式化微博内容(@用户转为链接)
 */
function formatContent(obj) {
  obj.contentFormat = obj.content
  //'hello @nickName - userName 你好'
  //'hello <a href="/profile/userName">@nickName</a> 你好'
  obj.contentFormat = obj.contentFormat.replace(constant.REG_FOR_AT_WHO, (matchStr, nickName, userName) => {
    return `<a href="/profile/${userName}">@${nickName}</a>`
  })
  return obj
}

/**
 * 格式化微博信息
 * @param {Array|Object} list  微博列表或者单个微博信息
 */
function formatBlog(list) {
  if (list == null) {
    return list
  }

  if (list instanceof Array) {
    // 数组 
    return list.map(formatDBTime).map(formatContent)
  }
  // 对象
  return formatContent(formatDBTime(list))
}

module.exports = {
  formatUser,
  formatBlog
}