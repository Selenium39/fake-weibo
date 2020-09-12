/**
 * 用户数据模型test
 */

const User = require('../../src/db/model/User')

test('test user model attribute', () => {
    //build会在内存模型中构建一个User对象，但不会提交到数据库中
    const user = User.build({
        userName: 'zhangsan',
        password: '123456',
        nickName: 'zhangsan',
        picture: '/xxx.png',
        city: 'shanghai'
    })
    // 验证各个属性
    expect(user.userName).toBe('zhangsan')
    expect(user.password).toBe('123456')
    expect(user.nickName).toBe('zhangsan')
    expect(user.picture).toBe('/xxx.png')
    expect(user.gender).toBe(3)
    expect(user.city).toBe('shanghai')
})