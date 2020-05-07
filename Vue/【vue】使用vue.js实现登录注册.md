# 前期准备

* node.js
* vue-cli脚手架
* router
* vuex
* axios

#### 一.在node.js官网下载node

1. 可在命令行敲 node -v检测是否按照成功

2. 在下载node的同时，npm也安装成功，npm是一个包管理工具，同样可使用npm -v检测是否安装成功

#### 二.下载脚手架以及相关包

```shell
npm install --g vue-cli
```

1. 此脚手架为vue-cli2

2. 安装时会进行一系列提示，逐一进行回答即可，注意安装router

3. 安装axios，vuex

```shell
npm install axios vuex --save
```

注：save的意思是，把他们加入相关依赖，在node-module文件夹中的package.json中可以找到

#  开始项目

#### 一.创建组件，进行路由配置

1. 一共三个组件，分别是index.vue(登录进去之后显示的页面),login.vue,register.vue

2. 点击跳转路由后，在app.vue中进行渲染

3. 路由配置

```javascript
const router=new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/index',
      component: Index
    }
  ],
  mode:'history'
})
```

注：需要将相关组件引入

#### 二.axios封装

1. 在src文件夹设置network文件夹，再设置index.js，将以下代码写入index.js即完成封装

```javascript
import axios from 'axios'

export function request(config){
    const instance = axios.create({
        baseURL: "http://localhost:3000"
    })
return request(config);
}
```

注：封装之后，不必在每个路由中引入axios，直接引入request即可

```javascript
import {request} from '../network/index';
```

**好处**：这样即使某天axios不再使用，不必一个个组件的进行更改，直接在index.js中进行修改即可。

#### 三.实现注册组件

1. template部分

```html
<template>
  <div>
     <div class="container-fluid">
         <div class="row">
             <div class="col-xs-5">
                 <img src="../assets/1.png" class="img-responsive">
             </div>
             <nav class="col-xs-7">
                <div class="row">
                   <ul class="col-xs-3 navbar nav">
                       <li><router-link to='/login'>沸点官网</router-link></li>
                   </ul>
                   <ul class="col-xs-3 navbar nav">
                       <li><router-link to='/login'>沸点交流群</router-link></li>
                   </ul>
                   <ul class="col-xs-3 navbar nav">
                       <li><router-link to='/login'>Wiki账户</router-link></li>
                   </ul>
                   <ul class="col-xs-3 navbar nav">
                       <li><router-link to='/login'>登录</router-link></li>
                   </ul>
                </div> 
                <div class="row">
                    <div class="col-xs-1"></div>
                    <div class="col-xs-11"><h2>欢迎加入沸点</h2></div>
                </div>
                <div class="row">
                    <div class="col-xs-1"></div>
                    <div class="col-xs-11"><h4>每一天都要进步！</h4> </div>
                </div>
                 <div class="row">
                    <div class="col-xs-3"></div>
                    <div class="col-xs-6">
                        <form role="form">
                            <el-alert title="邮箱不能为空" type="error"  v-show="error.email"></el-alert>
                            <div class="form-group">
                                <label for="email"></label>
                                <input type="email" class="form-control" placeholder="邮箱" @blur="handleError('email')" v-model="registerForm.email">
                            </div>
                            <el-alert title="密码不能为空" type="error"  v-show="error.password"></el-alert>
                            <div class="form-group">
                                <input type="password" class="form-control" placeholder="密码" @blur="handleError('password')" v-model="registerForm.password">
                            </div>
                            <el-alert title="两次输入的密码不一致" type="error"  v-show="error.confirmPass"></el-alert>
                            <div class="form-group">
                                <input type="password" class="form-control" placeholder="确认密码" @blur="compare" v-model="registerForm.confirmPass">
                            </div>
                            <el-alert title="姓氏不能为空" type="error"  v-show="error.firstName"></el-alert>
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="姓氏" @blur="handleError('firstName')" v-model="registerForm.firstName">
                            </div>
                            <el-alert title="名字不能为空" type="error"  v-show="error.lastName"></el-alert>
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="名字" @blur="handleError('lastName')" v-model="registerForm.lastName">
                            </div>
                            <el-alert title="内容不能为空" type="error"  v-show="error.spell"></el-alert>
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="姓名的拼音(全拼)" @blur="handleError('spell')" v-model="registerForm.spell">
                            </div>
                            <el-alert title="学号不能为空" type="error"  v-show="error.id"></el-alert>
                            <div class="form-group">
                                <input type="text" class="form-control" placeholder="学号" @blur="handleError('id')" v-model="registerForm.id">
                            </div>
                            <div class="form-group">
                                <select class="form-control">
                                    <option>大前端</option>
                                    <option>java</option>
                                    <option>iOS</option>
                                    <option>信息安全</option>
                                </select>
                            </div>
                            <el-button type="primary" class="btn-block" @click="register">注册</el-button>
                        </form>
                    </div>
                    <div class="col-xs-3"></div>
                </div> 
             </nav>
         </div>
     </div>
  </div>
</template>
```

注：此部分并不是重点，均是一些样式，将input输入框进行双向绑定即可

* 在点击按钮时触发相应的方法

* 首先，需要向服务器请求数据(get请求)，看此时的email是否在数据中（其实可以登录大同小异），如果在，则返回此账号已经注册过，直接登录即可。

* 如果第二条不成立，且输入的密码和确认密码一致，向服务器执行post请求

2. register方法代码全部

```javascript
register(){
            request({
                url:"/users"
            })
                .then(res=>{
                    const data=res.data.users;
                    console.log(data.users);
                    const users=[];
                    for(let key in data){
                    const user=data[key];
                    users.push(user);
                    }
                    let result=users.filter((user)=>{
                        return user.email===this.registerForm.email
                    })
                     //以上部分便是对服务器进行get请求，使用filter函数（一个数组方法,只会返回符合条件                      的数据）来过滤,如果返回的数据为空，则没有注册过，如果返回的数据不为空，则已经注册过
                    
                    
                    if(result!=null && result.length>0){
                    Message.warning("您已注册过，直接登录即可");
                    }else{
                         if(this.registerForm.email ==='' || this.registerForm.password === '' || this.registerForm.confirmPass === ''|| this.registerForm.firstName === '' || this.registerForm.spell === '' || this.registerForm.lastName === ''){
                            Message.warning("请完善信息");
                        }
                        else if(this.registerForm.password===this.registerForm.confirmPass){//验证密码和确认密码是否一致
                            const data={                       //将表单中的数据存储在对象中
                                email:this.registerForm.email,
                                password:this.registerForm.password,
                                firstName:this.registerForm.firstName,
                                lastName:this.registerForm.lastName,
                                spell:this.registerForm.spell,
                                id:this.registerForm.id
                            };
                            request({                         //执行post请求，将数据post到服                                                                 //务器
                                url:"/users",
                                method:'post',
                                data:data
                            })
                            .then(res=>{
                                Message.success("注册成功,请点击登录进行登录");
                            })
                        }
                        else{
                            Message.warning("两次输入密码不一致");
                        }
                    }
                })
           
        }
```



#### 四.实现登录部分

1. template部分

```html
<template>
  <div class="container">
    <div class="login">
       <img src="../assets/logo.png">
       <h1>Welcome to feidian</h1>
      <form class="form-inline">
        <div class="form-group">
            <input type="email" class="form-control email" id="inputEmail3" placeholder="请输入邮箱" v-model="email">
        </div>
        <div class="form-group">
          <span class="red">*</span>
        </div>
        <div class="form-group">
          <input type="password" class="form-control email" id="inputPassword3" placeholder="请输入密码" v-model="password">
        </div>
        <div class="form-group">
          <span class="red">*</span>
        </div>
      </form>
      <form class="form">
        <div class="form-group">
          <div class="">
            <div class="checkbox">
              <label>
                <input type="checkbox">记住密码
              </label>
            </div>
          </div>
        </div>
        <div class="form-group">
            <el-button type="primary" class="btn-block" @click="handleLogin">登录</el-button>
        </div>
      </form>
      <span>还没有沸点账号？</span>
      <router-link to='/regist'>立即注册</router-link>
    </div>
  </div>
</template>
```

注：和登录部分如同一辙，将表单进行双向绑定以及路由跳转即可。

2. handleLgin方法

```javascript
handleLogin(){
      if(this.email === '' || this.password === ''){
                if(this.email === ''&& this.password==='') Message.warning("邮箱和密码不能为空");
                else if(this.email==='') Message.warning('邮箱不能为空')
                else if(this.password === '') Message.warning("密码不能为空");
            }else{
                request({
                  url:"/users"
                })
                  .then(res=>{
                    console.log(localStorage.getItem('Authorization'));
                    console.log(res.data.token);
                    const data=res.data.users;
                    const users=[];
                    for(let key in data){
                      const user=data[key];
                      users.push(user);
                    }
                    let result=users.filter((user)=>{
                        return user.email===this.email && user.email===this.email
                    })
					if(result!=null && result.length>0){
                      this.$router.push('/index');
                    }else{
                      Message.warning("账号或密码错误");
                    }
                  })
            }
    }
```

注：其实和注册部分验证是否已经注册过思路一样，向服务器请求数据，然后使用filter方法验证，是否符合条件，由于已经配置过路由，所以可直接用$router进行相关路由的跳转。

#### 五.设置token

1. 在登录的时候，由服务器返回token，并保存着在vuex中

* 在账号和密码输入正确时

```javascript
 this.$store.commit('changeLogin',{
                        Authorization:res.data.token//这是从服务器返回的token
                      })
                      
```

2. 设置vuex

```javascript
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
 
const store = new Vuex.Store({
 
  state: {
    // 存储token
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : ''
  },
 
  mutations: {
    // 修改token，并将token存入localStorage
    changeLogin (state, user) {
      state.Authorization = user.Authorization;
      localStorage.setItem('Authorization', user.Authorization);
    }
  }
});
 
export default store;
```

注：记得在main.js中进行挂载

3. 设置拦截器

```javascript
instance.interceptors.request.use(config=>{
        if(localStorage.getItem('Authorization')){//如果不为空，因为在vuex中已经进行了相关赋值
            config.headers.Authorization=localStorage.getItem('Authorization');//将token保存在请求头中
        }

        return config;//记得一定要返回config
    },
    error=>{
        return Promise.reject(error);
    }
 )
```

此时，登录成功之后，token已经保存成功，可是仅仅保存token是不行的，我们需要进行请求，只有携带token的才能访问某些页面，便需要进行导航守卫。

4. 导航守卫

* 在router中进行以下配置

```javascript
router.beforeEach((to,from,next)=>{
  if(to.path==='/login'||to.path==='/regist'){
    next(); //跳转到点击将要去的页面
  }else{    //如果不是进行登录或注册，则需要进行token认证
    let token=localStorage.getItem('Authorization');//token已经储存在本地中
    if(token===null||token===''){//如果没有token,则需要进行登录
      next('/login')
    }else{
      next();//如果有，就跳转到点击想要去的页面
    }
  }
})
```

以上便是设置token的所有步骤，重在理解！

#### 六.使用node搭建小服务器

* 为了进行相关测试，用node搭建了一个服务器

* 在项目中创建了一个server文件夹，里面新建index.js

```javascript
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser')

//创建了一个app对象
var app = express();

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(require('cors')())  //解决跨域的问题

app.get('/users',(req,res)=>{
    fs.readFile('./db.json','utf-8',(err,data)=>{
        if(err){
            console.log("读取失败");
        }else{
            let list = JSON.parse(data)
            list.token='token'
            res.send(list);
        }
    })
})

app.post('/users',(req,res)=>{
    let users = req.body;
    fs.readFile('./db.json','utf-8',(err,data)=>{
        if(err){
            console.log("文件读取失败");
        }else{
            let list = JSON.parse(data).users;
            list.push(users);
            console.log(list);
            let json = JSON.stringify({users:list});
            fs.writeFile('./db.json',json,(err,data)=>{
                if(err){
                    console.log("写入失败");
                }else{
                    console.log(data);
                }
            })
        }
    })
    res.send("okkkk")
})

app.listen(3000,()=>{
    console.log("服务器正在running");
})
```

注：需要安装express，fs，body-parser，cors，详细步骤就不再进行简述。

# 项目部分结束，部署到GitHub

#### 1.准备工作

* 注册GitHub
* 创建仓库
* 下载git（并进行环境配置）
* 由于GitHub是国外服务器，在国内可能加载非常慢，可以在hosts文件中添加: 192.30.253.112 github.com

#### 2.开始push

* 将仓库克隆到本地，会创建一个和仓库名称一致的文件夹

```shell
git clone 仓库链接
```

* 进行提交

```shell
git add . (注意add后面有个空格再有个点)
git commit -m "first commit"
```

* 将本地代码push到仓库

```shell
git push -u origin master  (如果第一次可能需要输入账号和密码)
```



***

***END***

***by wind-jyf***













