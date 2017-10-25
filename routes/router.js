'use strict'

const router = require('koa-joi-router')()
const Joi = require('koa-joi-router').Joi
const validator = require('joi-validate-utils')

const controller = require('../src/controllers/example.controller')

router.route({
  method: 'get',
  path: '/example',
  handler: [
    controller.getExample
  ]
})

router.route({
  method: 'post',
  path: '/example/create',
  validate: validator.jsonBody({
    name: Joi.string().optional().allow('').default('example'),
    age: Joi.number().optional().default(23)
  }),
  handler: [
    validator.invalidHandler,
    controller.insertExample
  ]
})

router.route({
  method: 'post',
  path: '/example/update',
  validate: validator.jsonBody({
    _id: Joi.string().required(),
    name: Joi.string().optional(),
    age: Joi.number().optional()
  }),
  handler: [
    validator.invalidHandler,
    controller.updateExample
  ]
})


module.exports = router