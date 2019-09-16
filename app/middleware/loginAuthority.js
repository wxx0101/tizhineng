const jwt = require('jsonwebtoken');
const extendList = require('../../utils/extendList');
let loginWhiteList = require('../../config/loginWhiteList');
loginWhiteList = new extendList(loginWhiteList); 
// 解析token
function verifyToken(token,secret){
  return new Promise((reslove,reject)=>{
    jwt.verify(token,secret,(err,info)=>{
      if(!err){
        reslove(info);
      }else{
        reject(err);
      }
    });
  });
}
module.exports = () => {
  return async (ctx,next)=>{
    const {path, method } = ctx;
    // 登录白名单
    if(loginWhiteList.contains({url: path, method: method})){
      ctx.token = {
        superAdmin: true
      };
      await next();
      return;
    }
    let Authorization = unescape(ctx.get('authorization'));
    if(!Authorization){
      ctx.sendRes(ctx, {
        status: 401,
        code: 0,
        msg: '没有权限信息'
      });
      return;
    }
    let secret = ctx.app.config.keys;
    let userInfo = null;
    try{
      // {signTime,userName,identity,userPwd,name}
      userInfo = await verifyToken(Authorization,secret);
    }catch(err){
      ctx.sendRes(ctx, {
        code: 0,
        status: 401,
        msg: '权限信息可能被篡改'
      });
      return;
    }
       
    // 验证token是否过期
    let {signTime} = userInfo;
    let nowTime = new Date().getTime();
    let time = (nowTime - signTime) / 1000 / 60 / 60;
    if(time >= 2){ // 超时2小时
      ctx.sendRes(ctx, {
        code: 0,
        status: 401,
        msg: '权限信息过期'
      });
      return;
    }
    // 把用户信息存入ctx.token中
    ctx.token = userInfo;
    await next();
  };
};