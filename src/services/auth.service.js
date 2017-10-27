'use strict'

const passport = require('koa-passport')
const LocalStrategy = require('passport-local').Strategy
const WeiboStrategy = require('passport-weibo').Strategy
const WechatStrategy = require('passport-wechat').Strategy

/** 
 * 将user信息序列化至session/cookie 
 * 可在此处生成jsonwebtoken
 */
passport.serializeUser((user, done) => {
  const jwt = require('jsonwebtoken')
  const token = jwt.sign(user._id, 'screct_token')
  done(null, token)
})

/** 根据session中的token反序列化 */
passport.deserializeUser( async (token, done) => {
  const jwt = require('jsonwebtoken')
  const _id = jwt.verify(token, 'secret_token')
  /**
   * const user = await User.findOne({_id: _id})
   * done(null, user)
   */
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
  return done(null, user)
}))

/** 通过微信登录 */
passport.use(new WechatStrategy({
  appID: "{APPID}",
  name: "{默认为wechat,可以设置组件的名字}",
  appSecret: "{APPSECRET}",
  client: "{wechat|web}",
  callbackURL: "{CALLBACKURL}",
  scope: "{snsapi_userinfo|snsapi_base}",
  state: "{STATE}",
  getToken: "{getToken}",
  saveToken: "{saveToken}"
}, (accessToken, refreshToken, profile, expires_in, done) => {
  /**
   * const user = await User.findOrCreate({wechatId: profile.id})
   * return done(null, user)
   */
  return done(null, user)
}))

module.exports = router => {

  /** 注册微博回调 */
  router.get('/auth/weibo', passport.authenticate('weibo'))
  router.get('/auth/weibo/callback', passport.authenticate('weibo', (param1, param2) => {
    console.log(param1)
    console.log(param2)
  }))

  /** 注册微信回调 */
  router.get('/auth/wechat', passport.authenticate('wechat'))
  router.get('/auth/wechat/callback', passport.authenticate('wechat', (param1, param2) => {
    console.log(param1)
    console.log(param2)
  }))

  return passport
}