/**
 * 微博缓存层
 */

const {
    get,
    set
} = require('./redis')
const {
    getBlogListByUser
} = require('../service/blog')

//redis key prefix
const KEY_PREFIX = 'weibo:square:'

async function getSquareCacheList(pageIndex, pageSize) {
    const key = `${KEY_PREFIX}${pageIndex}_${pageSize}`

    //尝试获取缓存
    const cacheResult = await get(key)
    if (cacheResult) {
        //获取缓存成功过
        return cacheResult
    }
    //没有缓存，读取数据库{
    const result = await getBlogListByUser({
        pageIndex,
        pageSize
    })
    //设置缓存
    set(key, result, 60)
    return result;

}
module.exports = {
    getSquareCacheList
}