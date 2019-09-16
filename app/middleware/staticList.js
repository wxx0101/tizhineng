/*
 * @Author: tao 
 * @Date: 2019-06-28 15:39:07 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-09-15 09:20:50
 * @func 生成目录列表
 */
const fs = require('fs');
const path = require('path');
const rootStatic = path.join(__dirname,'../');
function createHref(dirList,pathname = '/'){
  return dirList.map(item => {
    return {
      name: item,
      href: path.join(pathname,item)
    };
  //   return `<li><a href="${path.join(pathname,item)}"">${item}</a></li>`;
  // }).join('');
  });
}
module.exports = () => {
  return async (ctx, next) => {
    // console.log('staticList',ctx);
    const {pathname} = ctx.req.urlParse;
    // const {log} = ctx.helper;
    const isExis = fs.existsSync(path.join(rootStatic,pathname));
    if(isExis){
      const info = fs.statSync(path.join(rootStatic,pathname));
      if(info.isDirectory()){
        const dirList = fs.readdirSync(path.join(rootStatic,pathname));
        const staticListData = createHref(dirList,pathname);
        await ctx.render('staticList',{staticListData});
      }else {
        await next();
      }
    }else{
      await next();
    }
  };
};