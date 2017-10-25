
var express=require('express');

var router = express.Router();


var login=require('./admin/login.js');
var product=require('./admin/product.js');
var user=require('./admin/user.js');

//权限判断
router.use(function(req,res,next){
    //next();
    if(req.url=='/login' || req.url=='/login/doLogin'){
        next();

    }else{

        if(req.session.userinfo&&req.session.userinfo.username!=''){   //判断有没有登录

            req.app.locals['userinfo']=req.session.userinfo;
            next();
        }else{
            res.redirect('/admin/login')
        }
    }

})

//配置路由

router.use('/login',login);
router.use('/product',product);
router.use('/user',user);




module.exports = router;