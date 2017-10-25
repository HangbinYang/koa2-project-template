'use strict'

const config = require('./config')
const koa = require('koa')
const session = require('koa-session')
const redis = require('koa-redis')
const mongoose = require('mongoose')
const onerror = require('koa-onerror')
const response = require('koa-usual-response')
const helmet = require('koa-helmet')

const router = require('./routes/router')
const app = new koa()

onerror(app);

app.use(require('koa-response-time')())
/** session configuration */
app.keys = config.redis.keys
app.use(session({
  key: 'app:cookie',  /** {string} cookie key (default is koa:sess) */
  maxAge: 86400000, /** session有效期，默认为1天 */
  rolling: true, /** {boolean} 每次请求均刷新session/cookie有效期，默认为false */
  store: redis({
    host: config.redis.host,
    port: config.redis.port
  })
}, app))

/** mongodb configuration */
mongoose.connect(config.mongo, {
  /** auto build indexes in development environment */
  autoIndex: process.env.NODE_ENV === 'production' ? false : true,
  promiseLibrary: global.Promise,
  useMongoClient: true,
  poolSize: 100,
})

/** cors configuration */
app.use(require('@koa/cors')())

/** the response configuration */
app.use(response())

/** helmet */
app.use(helmet())

/** routes configuration */
app.use(router.middleware())

/** data compress */
app.use(require('koa-compress')())

app.listen(config.port, () => {
  console.log(`server startup at port: ${config.port}`)
  console.log(`current environment: ${process.env.NODE_ENV}`)
})