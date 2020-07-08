const  Koa = require('koa');
const Router = require('koa-router');
let router = new Router();
const mongoose = require('mongoose');
const fs = require('fs');
var obj="" ;
var Allnote="";
router.get('/insertNoteInfo',async (ctx)=>{
    fs.readFile('./data/note.json','utf8',(err,data)=>{
        data = JSON.parse(data);
        console.log(data);
        let count = 0;
        const Note = mongoose.model('Note');
        data.map((value,index)=>{
            console.log(value);
            let note = new Note(value);
            note.type = Math.floor(Math.random()*12)+1;
            note.save().then(()=>{
                count ++;
                console.log("成功",count);
                
            }).catch(err=>{
                console.log(err);
                
            })
        });
    });
    ctx.body = '导入数据';
});

router.post('/oneNote',async (ctx)=>{

    //获取model
    const Note = mongoose.model('Note');
    //接收post请求封装成user对象
    let newNote = new Note(ctx.request.body);
    let oneNote = ctx.request.body;
    let userName  = oneNote.userName;
    let  type = oneNote.type;
    //使用save保存用户信息
     await Note.find({$and:[{type:type},{userName:userName}]}).exec().then(async(result)=>{

       obj =result;
        
     }).catch(err=>{
         console.log(err);
         
     })

     await Note.find({userName:userName}).exec().then(async(result)=>{

        Allnote =result;
         
      }).catch(err=>{
          console.log(err);
          
      })

     await newNote.save().then(()=>{
         ctx.body={
             code:200,
             message:obj,
             Allnote:Allnote,

         }
     }).catch(err=>{
         ctx.body={
             code:500,
             message:err
         }
     });

     
 });

module.exports =  router;