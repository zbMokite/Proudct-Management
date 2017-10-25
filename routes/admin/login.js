var express = require('express');

var router = express.Router();
var bodyParser = require('body-parser');
var DB=require('../../modules/db.js');

// 设置body-parser中间件
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.get('/',function (req, res) {
   // res.send('登录页面');

    res.render('login.ejs');
})

router.post('/doLogin',function (req, res) {
    // res.send('admin user');

    var username=req.body.username;
    var password=req.body.password;

    //1.获取数据
    //2.连接数据库查询数据
    DB.find('user',{
        username:username,
        password:password
    },function(err,data){
        if(data.length>0){
            console.log('登录成功');
            //保存用户信息
            req.session.userinfo=data[0];

            res.redirect('/admin/product');  /*登录成功跳转到商品列表*/

        }else{
            //console.log('登录失败');
            res.send("<script>alert('登录失败');location.href='/admin/login'</script>");
        }
    })
})


router.get('/loginOut',function(req,res){


    //销毁session

    req.session.destroy(function(err){

        if(err){
            console.log(err);
        }else{
            res.redirect('/admin/login');
        }
    })
})

module.exports = router;


