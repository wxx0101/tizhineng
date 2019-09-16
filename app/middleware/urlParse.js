/*
 * @Author: tao 
 * @Date: 2019-06-28 16:56:19 
 * @Last Modified by: tao
 * @Last Modified time: 2019-06-30 21:24:04
 * @func 解析url地址
 */
const url = require('url');
module.exports = () => {
  return async (ctx, next) => {
    const {url: httpUrl} = ctx.req;
    ctx.req.urlParse = url.parse(httpUrl);
    await next();
  };
};