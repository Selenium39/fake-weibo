const {
    SuccessResult,
    ErrorResult
} = require("../model/Result")

const {
    CREATE_BLOG_ERROR
} = require('../model/ErrorInfo')

const {
    createBlog
} = require("../service/blog")

const xss = require('xss')

async function create({
    userId,
    content,
    image
}) {
    try {
        //创建微博
        const blog = await createBlog({
            userId,
            content: xss(content),//进行xss过滤，防止xss攻击
            image
        })
        return new SuccessResult(blog)
    } catch (err) {
        console.error(err.message, err.stack)
    }
    return new ErrorResult(CREATE_BLOG_ERROR)
}

module.exports = {
    create
}