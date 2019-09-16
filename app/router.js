'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // 用户登录的接口
  router.post('/user/login', controller.user.login);
  // 用户管理导入接口
  router.post('/management/importXlsx',controller.management.importXlsx);
  ///management/exportXlsx/original
  ///management/exportXlsx/data
  router.post('/management/exportXlsx/:original',controller.management.exportXlsx);
  //全部数据
  router.get('/management/alldata',controller.management.alldata);
  //新增接口
  router.post('/management/adddata',controller.management.adddata);
  //删除接口
  router.post('/management/removedata',controller.management.removedata);

};
