'use strict'

const jwt = require('jsonwebtoken')
const passport = require('koa-passport')
const LocalStrategy = require('passport-local').Strategy
const WeiboStrategy = require('passport-weibo').Strategy

/** 
 * 将user信息序列化至session/cookie 
 * 可在此处生成jsonwebtoken
 */
passport.serializeUser((user, done) => {

})

/** 根据session中的token反序列化 */
passport.deserializeUser((token, done) => {

})

/** 通过用户名密码验证登录 */
passport.use('usual', new LocalStrategy((username, password, done) => {
  
}))

/** 通过短信验证码登录 */
passport.use('sms', new LocalStrategy((phone, code, done) => {

}))

/** 通过微博登录 */
passport.use(new WeiboStrategy({
  clientID: '1284900648',
  clientSecret: '6783d38bb7caf3b311d7c23edb630845',
  callbackURL: "http://localhost:3000/auth/weibo/callback"
}, async (accessToken, refreshToken, profile, done) => {
  /**
   * const user = await User.findOrCreate({weiboId: profile.id})
   * return done(null, user)
   */
  console.log(profile)
}))

module.exports = router => {

  router.get('/auth/weibo', passport.authenticate('weibo'))
  router.get('/auth/weibo/callback', passport.authenticate('weibo', (param1, param2) => {
    console.log(param1, param2)
  }))

  return passport
}