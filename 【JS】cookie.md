# cookie

#### 什么是cookie？

* 页面用来保存信息的
  * 比如：自动登录、记住用户名
* cookie的特性
  * 同一个网站中所有页面共享一套cookie
  * 数量、大小有限
  * 过期时间
* JS中使用cookie
  * document,cookie

#### 如何在JS中使用cookie

```javascript
document.cookie = 'user=blue';
document.cookie = 'pass=blue';//不会被覆盖，只会被添加

//如果未设置过期时间，浏览器关闭只会，cookie便会过期
var oDate = new Date();
oDate.setDate(oDate.getDate()+14);//代表14天只会过期

document.cookie = 'user=blue;expires='+oDate;//设置过期时间
```

#### 封装cookie

```javascript
function setCookie(name,value,iDay){
	var oDate = new Date();
	oDate.setDate(oDate.getDate()+iDay);
    document.cookie =name+'='+value+';expires='+oDate;
}
```

#### 从cookie中读取数据

```javascript
function getCookie(name){
	var arr = ducument.cookie.split('; ');//空格不能少
    //cookie中的数据以'; '进行分割
    for(var i=0;i<arr.length;i++){
        var arr2 = arr[i].split('=');//数据形式一般为user='www'
        if(arr2[0]===name){
            return arr2[1];
        }else{
            return '';
        }
    }
}
```



#### 删除cookie

```javascript
function removeCookie(){
    setCookie(name,1,-1);
    //setcookie(名字，值，多少天后过期)
}
```

***

***End***

***by wind-jyf***

