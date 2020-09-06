const sequelize = require('./seq')
require('./model/index')
sequelize.sync({
    force: true  //如果表已经存在，则删除表后再创建
}).then((result) => {
    console.log('db async ok')
    process.exit()
}).catch((err) => {
    console.log('db async error')
    console.log(err)
});