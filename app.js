module.exports = app => {
  // 添加公共中间件
  const {List, log, addControllerRules} = app.config;
  const coreMiddlewareList = new List(app.config.coreMiddleware);
  // 文件列表中间件
  coreMiddlewareList.insert('staticList', 'bodyParser');
  coreMiddlewareList.insert('gzip', 'meta');
  coreMiddlewareList.insert('urlParse', 'static');
  coreMiddlewareList.insert('custom','overrideMethod');
  // 验证登录权限
  coreMiddlewareList.insert('loginAuthority','bodyParser');
  // 验证身份权限
  coreMiddlewareList.insert('identityAuthority', 'bodyParser');

  // 单页面中间件
  coreMiddlewareList.insert('singlePage', 'loginAuthority');
  log(app.config.coreMiddleware);

  // 添加controller中请求参数的校验规则
  addControllerRules(app.validator.addRule);
};