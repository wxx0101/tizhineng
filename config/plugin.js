'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  // 配置模板引擎 egg-view-nunjucks
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },
  // 引入参数校验插件
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  // 启用mysql
  mysql: {
    enable: true,
    package: 'egg-mysql',
  },
  cors:{
    enable: true,
    package: 'egg-cors',
  }
};

