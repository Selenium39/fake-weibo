const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const {
  SESSION_SECRECT_KEY
} = require('./conf/secrectKeys')

const {
  idProd,
  isProd
} = require('./util/env')

const index = require('./routes/index')
const user = require('./routes/view/user')
const error = require('./routes/view/error')
const userApi = require('./routes/api/user')
// app.use(jwt())

// error handler 
let errorConfig = {}
if (isProd) {
  errorConfig = { //线上环境遇到错误重定向到错误页
    redirect: '/error'
  }
}
onerror(app, errorConfig)

// middlewares
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// logger
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

// routes
app.use(index.routes(), index.allowedMethods())
app.use(user.routes(), user.allowedMethods())
//api
app.use(userApi.routes(), userApi.allowedMethods())
//404路由应该注册到最下面 
app.use(error.routes(), error.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app