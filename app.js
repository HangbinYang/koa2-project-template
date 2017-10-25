'use strict'

const mongoose = require('mongoose')
const compress = require('koa-compress')
const response = require('koa-usual-response')
const session = require('koa-session')
const restime = require('koa-response-time')
const helmet = require('koa-helmet')
const koa = require('koa')
const redis = require('koa-redis')
const cors = require('@koa/cors')

const config = require('./config')
const router = require('./routes/router')
const app = new koa()

app.use(restime())
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
app.use(cors())

/** helmet */
app.use(helmet())

/** 
 * The response configuration 
 * This module will handle global errors
 * then response friendly
 */
app.use(response())

/** routes configuration */
app.use(router.middleware())

/** data compress */
app.use(compress())

app.listen(config.port, () => {
  console.log(`server startup at port: ${config.port}`)
  console.log(`current environment: ${process.env.NODE_ENV}`)
})