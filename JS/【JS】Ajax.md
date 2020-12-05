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

#### XMLHttpRequest.open()

`XMLHttpRequest.open()`方法用于指定 HTTP 请求的参数，或者说初始化 XMLHttpRequest 实例对象。它一共可以接受五个参数。

```javascript
void open(
   string method,
   string url,
   optional boolean async,
   optional string user,
   optional string password
);
```

- `method`：表示 HTTP 动词方法，比如`GET`、`POST`、`PUT`、`DELETE`、`HEAD`等。
- `url`: 表示请求发送目标 URL。
- `async`: 布尔值，表示请求是否为异步，默认为`true`。如果设为`false`，则`send()`方法只有等到收到服务器返回了结果，才会进行下一步操作。该参数可选。由于同步 AJAX 请求会造成浏览器失去响应，许多浏览器已经禁止在主线程使用，只允许 Worker 里面使用。所以，这个参数轻易不应该设为`false`。
- `user`：表示用于认证的用户名，默认为空字符串。该参数可选。
- `password`：表示用于认证的密码，默认为空字符串。该参数可选。

注意，如果对使用过`open()`方法的 AJAX 请求，再次使用这个方法，等同于调用`abort()`，即终止请求。

#### XMLHttpRequest.send()

`XMLHttpRequest.send()`方法用于实际发出 HTTP 请求。它的参数是可选的，如果不带参数，就表示 HTTP 请求只有一个 URL，没有数据体，典型例子就是 GET 请求；如果带有参数，就表示除了头信息，还带有包含具体数据的信息体，典型例子就是 POST 请求。

#### XMLHttpRequest.abort()

`XMLHttpRequest.abort()`方法用来终止已经发出的 HTTP 请求。调用这个方法以后，`readyState`属性变为`4`，`status`属性变为`0`。

```
var xhr = new XMLHttpRequest();
xhr.open('GET', 'http://www.example.com/page.php', true);
setTimeout(function () {
  if (xhr) {
    xhr.abort();
    xhr = null;
  }
}, 5000);
```

上面代码在发出5秒之后，终止一个 AJAX 请求。

#### XMLHttpRequest.readyState

`XMLHttpRequest.readystate`返回一个整数，表示实例对象的当前状态。属性仅可读。它可能返回以下值。

* 0，表示XMLHttpRequst实例已经生成，但是实例的`open()`方法还没有被调用。
* 1，表示`open()`方法已经调用，但是实例的`send()`方法还没有被调用，仍然可以使用实例的`setRequestHeader()`方法，设定HTTP请求的头信息。
* 2，表示实例的`send()`方法已经被调用，并且服务器返回的头信息和状态码已经收到。
* 3，表示正在接收服务器传来的数据体（body部分）。这时，如果实例的`responseType`属性等于`text`或者空字符串，`responseText`属性就会包含已经收到的部分信息。
* 4，表示服务器返回的数据已经完全接收，或者本次接收已经失败。

#### XMLHttpRequest.onreadystatechange

`XMLHttpRequet.onreadystatechange`属性指向一个监听函数。`readystatechange`事件发生时（实例的`readyState`属性变化），就会执行这个函数。

#### XMLHttpRequest.response

`XMLHttpRequest.response`属性表示服务器返回的数据体（即 HTTP 回应的 body 部分）。它可能是任何数据类型，比如字符串、对象、二进制对象等等，具体的类型由`XMLHttpRequest.responseType`属性决定。该属性只读。

如果本次请求没有成功或者数据不完整，该属性等于`null`。但是，如果`responseType`属性等于`text`或空字符串，在请求没有结束之前（`readyState`等于3的阶段），`response`属性包含服务器已经返回的部分数据。

#### 事件监听属性

XMLHttpRequest 对象可以对以下事件指定监听函数。

- XMLHttpRequest.onloadstart：loadstart 事件（HTTP 请求发出）的监听函数
- XMLHttpRequest.onprogress：progress事件（正在发送和加载数据）的监听函数
- XMLHttpRequest.onabort：abort 事件（请求中止，比如用户调用了`abort()`方法）的监听函数
- XMLHttpRequest.onerror：error 事件（请求失败）的监听函数
- XMLHttpRequest.onload：load 事件（请求成功完成）的监听函数
- XMLHttpRequest.ontimeout：timeout 事件（用户指定的时限超过了，请求还未完成）的监听函数
- XMLHttpRequest.onloadend：loadend 事件（请求完成，不管成功或失败）的监听函数

