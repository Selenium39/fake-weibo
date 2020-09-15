/**
 * 微博数据相关工具
 */
const ejs = require('ejs')
const path = require('path')
const fs = require('fs')

//获取blog-list.ejs文件内容
const BLOG_LIST_TPL = fs.readFileSync(
     path.join(__dirname, '..', 'views', 'widgets', 'blog-list.ejs')
).toString()

/**
 * 
 * @param {微博列表} blogList 
 * @param {*} canReply 
 */
function getBlogListStr(blogList = [], canReply = false) {
     return ejs.render(BLOG_LIST_TPL, {
          blogList,
          canReply
     })
}

module.exports = {
     getBlogListStr
}