const {
    ErrorResult,
    SuccessResult
} = require("../model/Result")

const {
    UPLOAD_FILE_TOO_LARGE
} = require('../model/ErrorInfo')

const fse = require('fs-extra')

const path = require('path')

//文件最大体积1m
const MAX_SIZE = 1024 * 1024 * 1024
//存储目录
const BASE_SAVE_DIR = path.join(__dirname, '..', '..', 'uploadFiles')

//是否需要创建目录
fse.pathExists(BASE_SAVE_DIR).then(exist => {
    if (!exist) {
        fse.ensureDir(BASE_SAVE_DIR)
    }
})

/**
 * 保存文件
 * @param {string} name 文件名
 * @Param {string} type 文件类型
 * @Param {number} size 文件大小
 * @Param {string} filePath 文件路径
 */
async function saveFile({
    name,
    type,
    size,
    filePath
}) {
    if (size > MAX_SIZE) {
        //先将不符合要求的大文件删除掉
        await fse.remove(filePath)
        return new ErrorResult(UPLOAD_FILE_TOO_LARGE)
    }

    //移动文件
    const fileName = Date.now() + '.' + name //防止重名
    const destFilePath = path.join(BASE_SAVE_DIR, fileName)
    await fse.move(filePath, destFilePath)

    //返回信息
    return new SuccessResult({
        url: '/' + fileName
    })
}

module.exports = {
    saveFile
}