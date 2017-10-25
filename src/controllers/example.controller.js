'use strict'

const ExampleModel = require('../models/example.model')

module.exports = {

  insertExample: async ctx => {
    const example = await (new ExampleModel({
      name: ctx.request.body.name,
      age: ctx.request.body.age
    })).save()
    ctx.success(example)
  },

  getExample: async ctx => {
    const examples = await ExampleModel.find()
    ctx.success(examples)
  },

  updateExample: async ctx => {
    const name = ctx.request.body.name
    const age  = ctx.request.body.age
    const query = {
      _id: ctx.request.body._id
    }
    const operates = {'$set':{}}
    if (name) operates['$set'].name = name
    if (age) operates['$set'].age = age
    /**
     * Or you can do this
     * const operates = {}
     * if (name) operates.name = name
     * if (age) operates.age = age
     * 
     * mongoose will handle it correctly
     */
    await ExampleModel.update(query, operates)
    // await ExampleModel.updateName(ctx.request.body._id, name)
    ctx.success()
  }
}