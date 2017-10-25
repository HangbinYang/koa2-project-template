'use strict'

module.exports = () => {
  return async (ctx, next) => {
    try {
      await next()
    } catch (err) {
      ctx.error()
    }
  }
}