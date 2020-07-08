//接受前端的请求
const Router = require('koa-router');
let router = new Router();
const mongoose = require('mongoose');


router.post('/regUser',async (ctx)=>{
   //获取model
   const User = mongoose.model('User');
   //接收post请求封装成user对象
   let newUser = new User(ctx.request.body);
   //使用save保存用户信息
    await newUser.save().then(()=>{
        ctx.body={
            code:200,
            message:'注册成功'
        }
    }).catch(err=>{
        ctx.body={
            code:500,
            message:err
        }
    });
});

router.post('/loginUser',async(ctx)=>{
    //接收前端发的数据
    let loginUser = ctx.request.body;
    let userName  = loginUser.userName;
    let password = loginUser.password;
    //引入model
    const User = mongoose.model('User');
    //先查询用户名
    await User.findOne({userName:userName}).exec().then(async(result)=>{
        if(result){
            let  newUser = new User();
            await newUser.comparePassword(password,result.password).then(isMatch=>{
                if(isMatch){
                    ctx.body ={
                        code:200,
                        message:'登录成功',
                        userInfo:result
                    }
                }else{
                    ctx.body ={
                        code:202,
                        message:'密码错误'
                    }
                }
            })
        }else{
            ctx.body = {
                code:201,
                message:'用户不存在'
            };
        }
    })
    //比对 解密

})




module.exports =router;