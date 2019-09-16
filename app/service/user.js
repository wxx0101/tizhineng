const Service = require('egg').Service;
const {getAllUserQuery, getAllIdentityQuert, getUserFromIdentity,getAuthorityFromIdentity} = require('../sql/index');
class UserService extends Service{
  // 判断该身份是否存在
  async isIdentity(identity){
    let result = await this.app.mysql.select('identity', {
      where: {
        id: identity,
        isAble: 1
      }
    });
    return result.length === 0 ? false : true;
  }
  // 获取所有的用户信息
  async getAllUser(){
    const {mysql} = this.app;
    let result = await mysql.query(getAllUserQuery());
    return result;
  }
  // 获取所有的身份
  async getAllIdentity(){
    const {mysql} = this.app;
    let result = await mysql.query(getAllIdentityQuert());
    return result;
  }
  // 获取属于该身份的所有用户
  async getUserFromIdentity(identityId){
    const {mysql} = this.app;
    let result = await mysql.query(getUserFromIdentity(identityId));
    return result;
  }
  // 获取属于该身份的所有权限
  async getAuthorityFromIdentity(identityId){
    const {mysql} = this.app;
    let result = await mysql.query(getAuthorityFromIdentity(identityId));
    return result;
  }
  // 添加新的用户
  async addNewUser(userName, userPwd, identity){
    // 判断该是否存在
    let result = await this.isIdentity(identity);
    if(!result){
      return 'noIdentity';
    }
    // 判断给用户名是否存在
    let userResult = await this.app.mysql.select('user',{where: {userName,isAble: 1}});
    if(userResult.length !== 0){
      return 'userNameExsis';
    }
    await this.app.mysql.insert('user', {userName, userPwd, identity});
    return 'success';
  }
  // 添加新的身份
  async addNewIdentity(identityName){
    await this.app.mysql.insert('identity', {identityName});
    return 'success';
  }
  // 编辑用户
  async editUser(userid, editData){
    await this.app.mysql.update('user', editData, {
      where: {
        userid
      }
    });
    return 'success';
  }
  // 编辑身份
  async editIdentity(id, editData){
    await this.app.mysql.update('identity', editData, {
      where: {
        id
      }
    });
    return 'success';
  }
  // 根据身份和权限查询该条数据
  async findIdentityAutho(identity_id,authority){
    let result = await this.app.mysql.select('identity_autho', {
      where: {
        identity_id, 
        authority,
        isAble:1
      }
    });
    if(result.length === 0){
      return null;
    }
    return result[0].id;
  }
  // 给身份添加权限
  async addAuthorityForIdentity(identity_id,authority){
    let findResult = await this.findIdentityAutho(identity_id,authority);
    if(findResult !== null){
      return 'authoExsis';
    }
    await this.app.mysql.insert('identity_autho', {
      identity_id, authority
    });
    return 'success';
  }
  // 给身份去掉某个权限
  async removeAuthorityForIdentity(identity_id,authority){
    let findResult = await this.findIdentityAutho(identity_id,authority);
    if(findResult === null){
      return 'noAutho';
    }
    await this.app.mysql.update('identity_autho', {isAble: 0}, {
      where: {
        id: findResult
      }
    });
    return 'success';
  }
  // 删除用户和身份
  async removeUserAndIdentity(tableName, id){
    let key = tableName === 'user' ? 'userid' : 'id';
    await this.app.mysql.update(tableName,{isAble: 0},{
      where: {
        [key]: id
      }
    });
    return 'success';
  }
}
module.exports = UserService;