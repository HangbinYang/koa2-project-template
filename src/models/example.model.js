'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.Types.ObjectId

const ExampleModel = new Schema({
  name: {type: String, default: 'example'},
  age: {type: Number, default: 23}
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  }
})

/** 在执行save之前执行 */
// ExampleModel.pre('save', next => {
//   next()
// })

/**
 * 为模式设置静态方法
 */
ExampleModel.static('updateName', async (_id, name) => {
  
})

module.exports = mongoose.model('ExampleModel', ExampleModel)