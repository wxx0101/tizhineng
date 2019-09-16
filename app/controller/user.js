const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken');
// 签发token
function createToken(userInfo, key){
  // 签发token
  let token = jwt.sign(userInfo, key);
  return token;
}
class UserController extends Controller{
  constructor(props){
    super(props);
    this.statuShow = {
      nopass: () => this.ctx.sendRes(this.ctx, {
        code: 0,
        status: 406
      }),
      msg400: (msg) => this.ctx.sendRes(this.ctx, {
        code: 0,
        status: 400,
        msg: msg
      }),
      success: () => this.ctx.sendRes(this.ctx, {
        code: 1,
        status: 200
      }),
      successData: (data) => this.ctx.sendRes(this.ctx, {
        code: 1,
        status: 200,
        data: data
      }),
      noIdentity: () => this.ctx.sendRes(this.ctx, {
        code: 0,
        status: 406,
        msg: '该身份不存在'
      }),
      authoExsis: () => this.ctx.sendRes(this.ctx, {
        code: 0,
        status: 406,
        msg: '该身份的权限已经存在'
      }),
      noAutho: () => this.ctx.sendRes(this.ctx, {
        code: 0,
        status: 406,
        msg: '该身份的权限不存在，删除失败'
      }),
      userNameExsis: () => this.ctx.sendRes(this.ctx, {
        code: 0,
        status: 406,
        msg: '用户名重复'
      })
    };
  }
  // 登录接口
  async login(){
    //验证用户明和面是否符合规则
    let isSucc = this.ctx.valid(this.ctx, {
      rules: {
        userName: 'username',
        userPwd: 'userpwd'
      }
    });
    
    if(!isSucc){
      return;
    }
    // // 验证是否有用户名和密码
    let {userName, userPwd} = this.ctx.request.body;
    // 判断是否是超级管理员
    if(userName === this.ctx.app.config.superAdmin.userName && userPwd === this.ctx.app.config.superAdmin.userPwd){
      let userInfo = {
        signTime:new Date().getTime(),
        superAdmin: true
      };
      let token = createToken(userInfo, this.ctx.app.config.keys);
      this.statuShow['successData']({
        identityName: this.ctx.app.config.superAdmin.identityName,
        userName: this.ctx.app.config.superAdmin.userName,
        token: token,
        limitView: this.ctx.app.config.superAdmin.limitView
      });
      return;
    }
    let sql = `select * from user,identity where userName="${userName}" And user.identity=identity.id And user.isAble=1`;
    let userResult = await this.app.mysql.query(sql);
    if(userResult.length === 0){
      this.statuShow['msg400']('没有该用户');
      return;
    }
    if(userResult[0].userPwd !== userPwd){
      this.statuShow['msg400']('密码不正确');
      return;
    }
    // 获取该用户的视图权限信息
    let viewSql = `select * from identity,identity_autho where
    identity.id=identity_autho.identity_id And identity.id=${userResult[0].identity}
    And identity_autho.isAble=1
    `;
    let authoritys = await this.app.mysql.query(viewSql);
    // 该身份的所有的权限
    authoritys = authoritys.map(item => item.authority);
    // // 写入用户信息
    delete userResult[0].userPwd;
    let userInfo = {
      signTime:new Date().getTime(),
      ...userResult[0],
      authoritys
    };
    let token = createToken(userInfo, this.ctx.app.config.keys);
    // 获取所有的权限表
    let allAuthority = this.ctx.app.config.authority;
    // 把该身份所有的视图权限组合起来
    let authorityForIdentity = [];
    authoritys.forEach(item => {
      authorityForIdentity = authorityForIdentity.concat(allAuthority[item].vieibleRoutesElements);
    });
    authorityForIdentity = [...new Set(authorityForIdentity)];
    this.statuShow['successData']({
      identityName: userResult[0].identityName,
      userName: userResult[0].userName,
      token: token,
      limitView: this.ctx.app.config.removeVisibleRoutesElements(authorityForIdentity).toString() //筛选受限视图
    });
  }
}
module.exports = UserController;