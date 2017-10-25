'use strict'

const router = require('koa-joi-router')()
const Joi = require('koa-joi-router').Joi

const validator = require('joi-validate-generator')
const controller = require('../src/controllers/example.controller')

router.get('/', async ctx => {
  this.body = 'Hello'
})

router.route({
  method: 'get',
  path: '/validation',
  validate: validator.queryBody({
    name: Joi.string()
  }),
  handler: [
    controller.example
  ]
})

router.route({
  method: 'post',
  path: '/validation',
  validate: validator.jsonBody({

  }),
  handler: [
    controller.example
  ]
})


module.exports = router