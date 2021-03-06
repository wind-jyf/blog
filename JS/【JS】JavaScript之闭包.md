# JavaScript之闭包

#### 什么是闭包？

1. 闭包是一个可以访问外部 作用域的内部函数，即使这个外部作用域已经执行结束
2. 简单来说，如果一个函数内部有另外一个函数，此时就会形成闭包



#### 闭包的作用？

1. timer定时器，事件处理时，Ajax请求中被作为回调
2. 被外部函数作为返回结果，或者返回对象中引用该函数

##### 定时器

```javascript
(function autorun(){
    let x = 1;
    setTimeout(function log(){
      console.log(x);
    }, 10000);
})();
```

1. 此时的变量x会一直存活到定时器的回调被调用

#### 从代码中理解闭包

```javascript
function initEvents(){
  for(var i=1; i<=3; i++){
    $("#btn" + i).click(function showNumber(){
      alert(i);//4
    });
  }
}
initEvents();
```

相信这是一个我们经常见到的闭包，下面我们从JavaScript引擎来分析一下

1. 首先会创建一个全局执行上下文入栈
2. 当要执行initEvents时，会创建一个函数执行上下文入栈
3. 执行initEvents
4. 此时引擎会发现函数里有一个闭包，然后为这个闭包保存它所需要的**变量引用**
5. 当闭包外部函数执行完毕后，执行闭包函数
6. 但由于此时保存的是外部，也就是i的变量引用，此时的i已经是4了

**我们都知道将var改为let，就会输出我们想要的代码了，这是为什么呢？**

1. let是有块级作用域的，而var只有函数作用域
2. 当改为let后，此时再为闭包保存**变量引用**时，每循环一次，保存的就是一个不同的let
3. 如果将let放在外面定义，此时输出的就会又是原来的了，这是因为每次保存的就是同一个引用



#### 个人理解

* 闭包就是会保存起来对外部**变量的引用**
* 所有的JavaScript都是闭包
* 因为所有的JavaScript都是闭包，所以当定义一个函数时，就定义了一个闭包
* 当闭包不被任何其他对象使用时，它也就会被销毁掉



参考：

* [[译]发现 JavaScript 中闭包的强大威力](https://juejin.im/post/5c4e6a90e51d4552266576d2 )
* [JavaScript闭包的底层运行机制]( http://blog.leapoahead.com/2015/09/15/js-closure/ )



***

***End***

***by wind-jyf***

