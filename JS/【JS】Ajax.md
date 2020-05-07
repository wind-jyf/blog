# Ajax

#### 补充知识

* get
  * 通过网址
  * 容量小
  * 安全性差
  * 有缓存

* post
  * 不通过网址
  * 容量大（2G）
  * 安全性较高
  * 无缓存

#### 写Ajax

###### 1.创建Ajax对象

```javascript
var oAjax = new XMLHttpRequest();//兼容非IE6

if(window.XMLHttpRequest){//如果不用window，IE6会报错
	var oAjax = new XMLHttpRequest();
}else{
    var oAjax = new ActiveXObject("Microsoft.XMLHTTP");
}
```



###### 2.连接到服务器

```javascript
//open(方法,文件名，异步传输)
oAjax.open('Get','a.txt',true);
```

* 发送请求

```javascript
oAjax.send(null);
//send()方法接收一个参数，即要求作为请求主题发送的数据(post时)。
//如果不需要通过请求主题发送数据，则必须传入null
//这次请求是同步的
```



###### 3.接收返回值

```javascript
oAjax.onreadystatechange = function(){
	//oAjax.readyState  与浏览器和服务器的通信，进行到哪一步了
    if(oAjax.readyState==4){//读取完成，不能判断是否成功
        if(oAjax.status==200){
            alert(oAjax.responseText)；
        }else{
            alert("失败");
        }
    }
};
```

oAjax.readyState的值：

* 0,（未初始化），还没有调用open方法

* 1，（载入）已调用send()方法，正在发送请求

* 2，（载入完成）send()方法完成，已收到全部响应内容

* 3，（解析）正在解析响应内容

* 4，（完成）响应内容解析完成，可以在客户端调用了
* 只要值发生变化，就会触发一次readystatechange事件

响应后相关的属性：

* responseText:作为响应主题被返回的文本，也就是读取的值
* responseXML:如果响应的内容是"text/xml"或"application/xml"，这个属性将保存着响应数据的XML DOM文档
* status:响应的HTTP状态
* statusText:HTTP状态的说明

###### 4.进行封装

```javascript
function ajax(url,fnSucc,fnFaild){
    if(window.XMLHttpRequest){//如果不用window，IE6会报错
		var oAjax = new XMLHttpRequest();
    }else{
        var oAjax = new ActiveXObject("Microsoft.XMLHTTP");
    }
    
    oAjax.open('Get',url,true);
    
	oAjax.send();
    
    oAjax.onreadystatechange = function(){
        //oAjax.readyState  与浏览器和服务器的通信，进行到哪一步了
        if(oAjax.readyState==4){//读取完成，不能判断是否成功
            if(oAjax.status==200){
                fnSucc(oAjax.responseText)；
            }else{
                if(fnFaild){
                    fnFaild(oAjax.status);
                }
            }
        }
	};
}
```

#### 设置获得头部信息

```javascript
oAjax.setReguestHeader("Myheader","Myvalue");//设置头部信息
```

```javascript
oAjax.getReguestHeader("Myheader");//获得指定的
oAjax.getAllReguestHeader();//获得全部
```

#### 超时设定

* timeout属性
* ontimeout事件

```javascript
oAjax.timeout = 1000;//将超时设置为1s
oAjax.ontimeout = function(){
    alert("请求超时")
}
```

注：如果在规定的时间内浏览器没有接收到响应，那么就会触发timeout事件



#### 使用promise实现Ajax操作

* new promise对象
* 在promise中进行数据保存
* new Ajax对象
* 返回promise

```javascript
const getJson = function(url,method){
    const promise = new Promise(function(resove,reject){
        const handler = function(){
            
            if(this.readyState !==4){//此时的this应是XMLHttpRequest对象
                return;
            }
            if(this.status === 200){
                resove(this.response);
            }else{
                reject(new Error(this.statusText));
            }
        };
        
        const client = new XMLHttpRequest();
        client.open(method,url,true);
        client.onreadystatechange = handler;//巧妙之处
        client.responseType = "json";
        client.setRequestHeader("Accept","application/json");
        client.send();
    });
    return promise;
};

getJson("/posts.json","Get").then(function(json){
    console.log(json);
},function(err){
    console.log(err);
});
```



#### 补充

* 用没有定义的变量——报错
* 用没有定义的属性——undefined     window.a
* 清除缓存：用时间拼接到URL后面使每次的url不同

***

***End***

***by wind-jyf***



