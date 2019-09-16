const fs = require('fs');
const path = require('path');
module.exports = () => {
  return async (ctx, next) => {
    const isRequestApi = ctx.get('api-request');
    if(isRequestApi !== 'yes'){
      // 不是api接口则要返回特定的文件
      ctx.body = fs.readFileSync(path.join(__dirname,'../public/spa/index.html'), 'utf-8');
      return;
    }
    // 是api接口则可以通过
    await next();
  };
};