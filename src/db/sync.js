const sequelize = require('../db/seq')

sequelize.async({
    force: true  //如果表已经存在，则删除表后再创建
}).then((result) => {
    console.log('db async ok')
}).catch((err) => {
    console.log('db async error')
    console.log(err)
});