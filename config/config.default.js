/* eslint valid-jsdoc: "off" */

'use strict';
const log = require('../utils/log');
const List = require('../utils/List').default;
const Stack = require('../utils/Stack').default;
const addControllerRules = require('../controllerRules');
const path = require('path');
const {
  authority, // 所有的权限模块
  removeVisibleApi, // 生成受限api
  removeVisibleRoutesElements // 生成受限视图
} = require('./limitList');
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1561689355792_3972';

  // add your middleware config here
  config.middleware = [];
  //上传文件
  config.multipart = {
    mode: 'stream',
    whitelist: [
      '.xlsx','.xls'
    ],
  };
  // config.cors = {
  //   origin:'http://localhost:3000',
  //   allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
  // };
  // server config
  config.cluster = {
    listen: {
      port: 8801
    }
  };
  // 静态模板引擎配置
  config.view = {
    root: [
      path.join(appInfo.baseDir, 'app/view')
    ].join(','),
    defaultViewEngine: 'nunjucks',
    mapping: {
      '.njk': 'nunjucks'
    },
    defaultExtension: '.njk'
  };

  // csrf 暂时关闭
  exports.security = {
    csrf: {
      enable: false
    },
  };
  
  exports.static = {
    prefix: '/public/'
  };

  // mysql options
  exports.mysql = {
    client: {
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: 'root',
      database: 'tizhineng'
    }
  };
  // 配置超级管理员
  const superAdmin = {
    identityName: '超级管理员',
    userName: 'superam',
    userPwd: 'superam',
    limitView: []
  };
  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    log,
    List,
    Stack,
    addControllerRules,
    authority, // 所有的权限模块
    removeVisibleApi, // 生成受限api
    superAdmin,
    removeVisibleRoutesElements // 生成受限视图
  };
  return {
    ...config,
    ...userConfig,
  };
};
