/**
 * utils api 路由
 */

const {
    loginCheck
} = require('../../middleware/loginChecks')
const router = require('koa-router')()
const koaForm = require('formidable-upload-koa')
const {
    saveFile
} = require('../../controller/utils')

router.prefix('/api/utils')

//上传图片
router.post('/upload', loginCheck, koaForm(), async (ctx, next) => { //路由中可以添加多个middleware
    const file = ctx.req.files['file'] //上传文件的key为file
    const {
        size,
        path,
        name,
        type
    } = file //获取文件相关信息
    ctx.body = await saveFile({
        size,
        filePath: path,
        name,
        type
    });
})


module.exports = router