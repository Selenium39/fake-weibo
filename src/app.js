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

const redisStore = require('koa-redis')
const session = require('koa-generic-session')

const path = require('path')

const {
  idProd,
  isProd
} = require('./util/env')

const user = require('./routes/view/user')
const error = require('./routes/view/error')
const blog = require('./routes/view/blog')
const userApi = require('./routes/api/user')
const utilApi = require('./routes/api/utils')
const homeApi = require('./routes/api/home')
const profileApi = require('./routes/api/profile')
const squareApi = require('./routes/api/square')
const AtApi = require('./routes/api/at')
const {
  REDIS_CONF
} = require('./conf/db')
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

//向外暴露的静态文件
app.use(require('koa-static')(__dirname + '/public'))
app.use(require('koa-static')(path.join(__dirname, '..', 'uploadFiles'))) //不能直接通过字符串拼接，需要使用path.join()函数拼接

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

//session配置(session一定要放到router的前面，不然ctx没有session属性)
app.keys = [SESSION_SECRECT_KEY]
app.use(session({
  key: 'weibo.sid', //default cookie name 'koa.sid'
  prefix: 'weibo:sess:', //redis key prefix 'koa:sess:'
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 //ms
  },
  store: redisStore({
    host: REDIS_CONF.host,
    port: REDIS_CONF.port,
    password: REDIS_CONF.password
  })
}))

// routes
app.use(user.routes(), user.allowedMethods())
app.use(blog.routes(), blog.allowedMethods())
//api
app.use(userApi.routes(), userApi.allowedMethods())
app.use(utilApi.routes(), utilApi.allowedMethods())
app.use(homeApi.routes(), homeApi.allowedMethods())
app.use(squareApi.routes(), squareApi.allowedMethods())
app.use(profileApi.routes(), profileApi.allowedMethods())
app.use(AtApi.routes(),AtApi.allowedMethods())
//404路由应该注册到最下面 
app.use(error.routes(), error.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app