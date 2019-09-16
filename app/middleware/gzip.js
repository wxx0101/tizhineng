/*
 * @Author: tao 
 * @Date: 2019-06-28 16:58:39 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-09-15 18:24:23
 * @func 对数据进行gzip压缩
 */
const options = { threshold: 1024 };
const compress = require('koa-compress');
module.exports = () => {
  return compress(options);
};