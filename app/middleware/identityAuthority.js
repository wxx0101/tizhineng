module.exports = () => {
  return async (ctx, next) => {
    console.log('token------',ctx.token);
    // 检查是否是超级管理员
    const {superAdmin} = ctx.token;
    if(superAdmin === true){
      await next();
      return;
    }
    // 提取身份标识
    const {identity} = ctx.token;
    if(!identity){
      this.ctx.sendRes(this.ctx, {
        code: 0,
        status: 401,
        msg: '该用户没有身份信息'
      });
      return;
    }
    // 获取该身份的权限信息

    let sql = `select * from identity,identity_autho where
    identity.id=identity_autho.identity_id And identity.id=${identity}
    And identity_autho.isAble=1`;
    const authorityInfo = await ctx.app.mysql.query(sql);
    // console.log('authorityInfo-----',authorityInfo);
    const authoritys = authorityInfo.map(item => item.authority);
    // 获取所有的权限表
    let allAuthority = ctx.app.config.authority;
    // 把该身份所有的api权限组合起来
    let authorityForIdentity = [];
    authoritys.forEach(item => {
      authorityForIdentity = authorityForIdentity.concat(allAuthority[item].visibleApi);
    });
    authorityForIdentity = [...new Set(authorityForIdentity)];
    // 筛选受限的api
    let limitApi = ctx.app.config.removeVisibleApi(authorityForIdentity);
    console.log('limitApi---------',limitApi);
    // 获取本次的请求url信息
    const {path, method } = ctx;
    // 判断本次请求在首先列表中是否存在
    // console.log(limitApi.contains({url:path, method}));
    // if(limitApi.contains({url:path, method})){ // 受限，不通过
    //   ctx.sendRes(ctx, {
    //     code: 0,
    //     status: 401,
    //     msg: '您不具备访问该接口的权限'
    //   });
    //   return;
    // }
    await next();
  };
};