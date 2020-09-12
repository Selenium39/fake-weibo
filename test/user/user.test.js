/**
 * 用户相关接口单元测试
 */

const server = require('../server')

//用户信息
const userName = `u_${Date.now()}`
const password = `p_${Date.now()}`
const testUser = {
    userName,
    password,
    nickName: userName,
    gender: 1
}

//存储 cookie
let COOKIE = ''

//注册
test('test register', async () => {
    const res = await server.post('/api/user/register').send(testUser)
    expect(res.body.errCode).toBe(0)
})

//重复注册
test('rest duplicated register', async () => {
    const res = await server.post('/api/user/register').send(testUser)
    expect(res.body.errCode).not.toBe(0)
})

//查询用户是否存在
test('test username is exsit', async () => {
    const res = await server.post('/api/user/isExist').send({
        userName
    })
    expect(res.body.errCode).toBe(0)
})

//json schema 检测'
test('json schema', async () => {
    const res = await server.post('/api/user/register').send({
        userName: '123', //用户名不是字母或者下划线开头
        password: 'a', //最小长度不是3
        gender: 'a' //gender不是数字
    })
    expect(res.body.errCode).not.toBe(0)
})

//登录
test('login', async () => {
    const res = await server.post('/api/user/login').send({
        userName,
        password
    })
    expect(res.body.errCode).toBe(0)

    //获取COOKIE,调用删除API
    COOKIE = res.headers['set-cookie'].join(';')
})

//删除
test('delete user', async () => {
    const res = await server.post('/api/user/delete').set('cookie', COOKIE) //设置cookie，绕过登录
    expect(res.body.errCode).toBe(0)
})

//再次查询用户，应该不存在
test('test username is exsit again', async () => {
    const res = await server.post('/api/user/isExist').send({
        userName
    })
    expect(res.body.errCode).not.toBe(0)
})