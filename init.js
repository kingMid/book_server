const mongoose = require('mongoose');
const db ='mongodb://localhost/book';


//引入 Schema
const glob = require('glob');
const path = require('path');
exports.initSchemas = ()=>{
    glob.sync(path.resolve(__dirname, './model', '*.js')).forEach(require);
}
//连接数据库方法
exports.connect = ()=>{
    //连接数据库
    mongoose.connect(db,{useNewUrlParser:true});
    //监听
    mongoose.connection.on('disconnected',()=>{
        mongoose.connect(db);
    });
    //数据库出错
    mongoose.connection.on('err',err=>{
        console.log(err);
        mongoose.connect(db);
    });
    //连接的时候
    mongoose.connection.once('open',()=>{
        console.log('mongodb connectd success');
    });
}