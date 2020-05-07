# 实现通过向后台请求数据来显示在表格里以及删除

*前端代码如下：*

```html
<template>
  <div>
  <center>
  <table class="table table-bordered">
  <thead>
    <tr>
      <th>#</th>
      <th>单词</th>
      <th>释义</th>
      <th>操作</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(word,index) in words" :key="index">
              <td>{{index+1}}</td>
              <td>{{word.word}}</td>
              <td>{{word.translate}}</td>
              <td><button type="primary" class="btn btn-danger"  @click="handle(index)">删除</button></td>
    </tr>
  </tbody>
</table>
</center>
  </div>
</template>
```

```javascript

<script>
import { Message } from 'element-ui';
import { request } from '../../network'
export default {
  data(){
    return {
      words:[]
    }
  },
  methods:{
    handle(index){
      const data={
        index:index
      }

      request({
        url:'/list',
        method:'post',
        data:data
      })
      .then(res=>{
        Message.success("删除成功");
        request({
        url:'/list'
        })
        .then((res)=>{
          this.words=res.data.words;
          console.log(this.words);
        })
      })

    }
  },
  created(){
    request({
      url:'/card'
    })
    .then((res)=>{
      this.words=res.data.words;
    })
  }
}
```



**注：**

* 使用v-for进行遍历，一定要有key
* 在组件开始创建时便请求数据，进行显示（生命周期）
* 由于请求是异步的，所以在删除的时候，当再次请求数据时，一定要放在删除请求的回调函数中，而不是将代码并行放到下面



*后端代码*

```javascript
const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser')

//创建了一个app对象
var app = express();

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(require('cors')())  //解决跨域的问题

app.get('/card',(req,res)=>{
    fs.readFile('./db.json','utf-8',(err,data)=>{
        res.send(data);
    })
}),

app.get('/list',(req,res)=>{
    fs.readFile('./db.json','utf-8',(err,data)=>{
        res.send(data);
    })
}),

app.post('/list',(req,res)=>{          
    let index = req.body.index;   //通过索引进行删除
    console.log(index);
    fs.readFile('./db.json','utf-8',(err,data)=>{
        if(err){
            console.log("文件读取失败");
        }else{
            let list = JSON.parse(data).words;
            list.splice(index,1);
            console.log(list);
            let json = JSON.stringify({words:list});
            fs.writeFile('./db.json',json,(err,data)=>{
                if(err){
                    console.log("写入失败");
                }else{
                    console.log(data);
                }
            })
        }
    })
    res.send("okkk");
})
app.listen(3000,()=>{
    console.log("服务器正在running");
}) 
```

注：

* post请求：在进行删除的时候，由前端返回索引到后端，通过splice函数进行删除
* get请求：后端读取文件返回数据给后台

# 总结

* 其实较难的知识点没有什么，熟悉运用v-for
* axios封装、请求操作
* 生命周期
* 数组相关操作
* node的post，get相关请求，以及读文件，字符串以及数组之间的转化



***

***END***

***by wind-jyf***



