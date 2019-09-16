const Controller = require('egg').Controller;
const xlsx = require("node-xlsx");
const path = require('path');
const md5 = require('md5');
const uid = require('node-uid');
const fs = require('fs');
// const tmp = require('tmp')
// //故名思意 异步二进制 写入流
const awaitWriteStream = require('await-stream-ready').write;
//管道读入一个虫洞。
const sendToWormhole = require('stream-wormhole');
/**
 * [formatData 格式化表格数据]
 */
const formatData = function(data){
    let sheet1Data = data[0].data;
    let dataResult = [];
    sheet1Data.map((item,index)=>{
        if(index > 0){
            dataResult.push(item.reduce((prev,value,i)=>{
                let key = sheet1Data[0][i];
                let keyWord = key.match(/\((\w+)\)/)[1];
                prev[keyWord] = value;
                prev.id = uid(10);
                return prev;
            },{}))
        }
    })
    return dataResult;
}
//获取表格首行数据
const getColFirst = function(data){
    let sheet1Data = data[0].data;
    return sheet1Data[0];
}
//读取表格文件返回文件流
const readFile = (filepath)=>new Promise((resolve)=>{
    const rs = fs.ReadStream(filepath);
    let buf = Buffer.from('');
    rs.on('data',(chunk)=>{
        buf = Buffer.concat([buf,chunk])
    })
    rs.on('end', () => {
        resolve(buf);
    })
})

class Management extends Controller{
    /**
     * 文件上传
     */
    async importXlsx(){
        const {ctx} = this;
        if (this.ctx.get('Content-Type').startsWith('multipart/')) {
            const stream = await ctx.getFileStream();
            const filename = md5(stream.filename) + '_' + Date.now() + path
                .extname(stream.filename)
                .toLocaleLowerCase();
            const target = path.join(this.config.baseDir, 'app/public/uploads', filename);
            
            const writeStream = fs.createWriteStream(target);
            try {
                //异步把文件流 写入
                await awaitWriteStream(stream.pipe(writeStream));
            } catch (err) {
                //如果出现错误，关闭管道
                await sendToWormhole(stream);
                throw err;
            }
            const filepath = path.join(__dirname,'../public/uploads',filename);
            // console.log(filepath)
            let xlsxData = formatData(xlsx.parse(filepath));
            let res = await this.service.management.importXlsx(xlsxData);
            if(res.serverStatus){
                ctx.sendRes(this.ctx, {
                    code: 1,
                    status: 200,
                    data: xlsxData
                })
            }else{
                ctx.sendRes(this.ctx, {
                    code: 0,
                    status: 400,
                    msg: '插入数据失败'
                })
            }
            
        }else{
            ctx.sendRes(this.ctx, {
                code: 0,
                status: 400,
                msg: '参数格式不正确'
            })
        }
        
    }
    /**
     * 文件导出
     */
    async exportXlsx(){
        const {ctx} = this;
        const {original} = ctx.params;
        let {filename='staffList',data} = ctx.request.body;
        const filepath = path.join(__dirname,'../public/original/',filename+'.xlsx');
        
        if(original === 'original'){  //导出原始模板
            //设置ctx附件
            ctx.attachment(filename+'.xlsx');
            //设置返回得内容格式为二进制流文件格式
            ctx.set('Content-Type', 'application/octet-stream');
            //得到buffer文件
            const rs = await readFile(filepath);
            ctx.body = rs;
        }else if(original === 'data'){ //data 导出部分数据
            if(!data){
                ctx.sendRes(this.ctx, {
                    code: 0,
                    status: 400,
                    msg: '参数格式不正确'
                })
                return ;
            }
            data = JSON.parse(data);  //要读取的id
            let res = await this.service.management.findData(data);
            let resdata = [getColFirst(xlsx.parse(filepath))].concat(res.map(item=>Object.values(item)));
            //生成表格文件返回值为buffer 响应buffer回去不用在后台生成真实文件
            const buf = xlsx.build([
                {
                    name:'sheet1',
                    data:resdata   
                }
            ])
            ctx.body = buf;
        }
    }
    /**
     * 获取全部数据
     */
    async alldata(){
        console.log('alldata--------------------------------');
        let {limit=10,pageid=0} = this.ctx.request.query;
        try{
            let data = await this.service.management.alldata(limit*1,pageid*1);
            this.ctx.sendRes(this.ctx, {
                code: 1,
                status: 200,
                data
            })
        }catch(error){
            this.ctx.sendRes(this.ctx, {
                code: 0,
                status: 406,
                msg: '获取数据出错'
            })
        }
    }
    /** 
     * 删除数据
     */
    async removedata(){
        let {ctx,service} = this;
        let {id} = ctx.request.body;
        try{
            id = JSON.parse(id);
            await service.management.removedata(id)
            this.ctx.sendRes(this.ctx, {
                code: 1,
                status: 200,
                msg: '删除成功'
            })
        }catch(err){
            console.log(err);
            this.ctx.sendRes(this.ctx, {
                code: 0,
                status: 400,
                msg: '参数有误！'
            })
        }
        
    }
    /**
     * 新增数据
     */
    async adddata(){
        let {ctx} = this;
        let keys = ['staffName','department','position','tel','address']
        let flag = keys.every(item=>Object.keys(ctx.request.body).includes(item));
        if(!flag){
            this.ctx.sendRes(this.ctx, {
                code: 0,
                status: 400,
                msg: '参数有误！'
            })
            return;
        }
        try{
            await this.service.management.adddata(ctx.request.body);
            this.ctx.sendRes(this.ctx, {
                code: 1,
                status: 200,
                msg: '添加成功'
            })
        }catch(err){
            console.log(err);
            this.ctx.sendRes(this.ctx, {
                code: 0,
                status: 400,
                msg: err.sqlMessage
            })
        }
    }
}



module.exports = Management;