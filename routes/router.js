'use strict'

const router = require('koa-router')()

router.get('/', ctx => {
  ctx.body = 'Hello'
})


module.exports = router