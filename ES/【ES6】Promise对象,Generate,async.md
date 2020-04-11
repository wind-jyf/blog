#  Promise对象

#### 1.三种状态

* fulfilled
* pending
* rejected

#### 2.状态的缺点

* 无法取消Promise
* 如果不设置回掉函数，Promise内部抛出的错误，不会反应到外部
* 当处于pending状态时，无法得知目前进展到哪一阶段

#### 3.then方法

* 接收两个函数作为参数
* 第一个参数是Promise执行成功的回调
* 第二个参数是执行失败的回调

#### 4.链式调用

```javascript
const p = new Promise(function(resolve,reject){
  resolve(1);
}).then(function(value){ // 第一个then // 1
  console.log(value);
  return value * 2;
}).then(function(value){ // 第二个then // 2
  console.log(value);
}).then(function(value){ // 第三个then // undefined
  console.log(value);
  return Promise.resolve('resolve'); 
}).then(function(value){ // 第四个then // resolve
  console.log(value);
  return Promise.reject('reject'); 
}).then(function(value){ // 第五个then //reject:reject
  console.log('resolve:' + value);
}, function(err) {
  console.log('reject:' + err);
});
```

# yield

* yield一般会搭配生成器使用
* yield既可以传参(在next中进行)，还可以返回值
* yield可用于异步操作

```javascript
let a = yield 异步操作   //a为yield的返回值
```

此时yield右边为一部分，只有它执行完毕，才会去执行yield左边



# Generate函数

* 在function后，函数名之前有个*
* 函数内部有yield表达式
* *用来表示函数为Generator函数，yield用来定义函数内部的状态
* 不能使用箭头函数

```javascript
function* sendParameter(){
    console.log("strat");
    var x = yield '2';
    console.log("one:" + x);
    var y = yield '3';
    console.log("two:" + y);
    console.log("total:" + (x + y));
}
```

* next方法不传入参数时，yield表达式的返回值是undefined

```javascript
var sendp1 = sendParameter();
sendp1.next();
// strat
// {value: "2", done: false}
sendp1.next();
// one:undefined
// {value: "3", done: false}
sendp1.next();
// two:undefined
// total:NaN
// {value: undefined, done: true
```



* 当next传入参数的时候，该参数会作为上一步yield的返回值

```javascript
var sendp2 = sendParameter();
sendp2.next(10);
// strat
// {value: "2", done: false}
sendp2.next(20);
// one:20
// {value: "3", done: false}
sendp2.next(30);
// two:30
// total:50
// {value: undefined, done: true}
```

* return方法：返回给定值，并结束遍历Generator函数

```javascript
function* foo(){
    yield 1;
    yield 2;
    yield 3;
}
var f = foo();
f.next();
// {value: 1, done: false}
f.return("foo");
// {value: "foo", done: true}
f.next();
// {value: undefined, done: true}
```





# async

###### 语法

```javascript
async function name([param[, param[, ... param]]]) { statements }
```

* name：函数名称
* param：参数名称
* statements：函数体

###### 返回值

* async函数会返回一个Promise对象，可以使用then方法添加回调函数

```javascript
async function helloAsync(){
    return "helloAsync";
  }
  
console.log(helloAsync())  // Promise {<resolved>: "helloAsync"}
 
helloAsync().then(v=>{
   console.log(v);         // helloAsync
})
```

###### await

* await关键字仅在async function中有效。
* async函数执行时，遇到await会暂停，直到触发的异步操作完成
* 用于等待一个promise对象
*  返回 Promise 对象的处理结果。如果等待的不是 Promise 对象，则返回该值本身 

```javascript
function testAwait (x) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(x);
    }, 2000);
  });
}
 
async function helloAsync() {
  var x = await testAwait ("hello world");
  console.log(x); 
}
helloAsync ();
// hello world
```

await针对所跟的不同表达式的处理方式

* promise对象：await会暂停执行，等待promise对象resolve，然后恢复，并返回解析值
* 非promise对象：直接返回对应的值



# Promise和Generate函数的结合

```javascript
function getFoo () {
    return new Promise(function (resolve, reject){
      resolve('foo');
    });
  }
  
  const g = function* () {
    try {
      const foo = yield getFoo();
      console.log(foo);//foo    
    } catch (e) {
      console.log(e);
    }
  };
  
  function run (generator) {
    const it = generator();
  
    function go(result) {
      if (result.done) return result.value;//递归终止项
  
      return result.value.then(function (value) {
        return go(it.next(value));//undefined
      }, function (error) {
        return go(it.throw(error));
      });
    }
  
    go(it.next());//递归函数
  }
  
  console.log(run(g));
```

运行步骤：

1.  执行run函数，并将生成器当做参数传进去
2.  用it接收生成器对象
3.  执行go函数，执行it.next()
4.  执行yield右边的代码，返回promise对象
5.  执行go函数体内部的代码，执行then，并将promise对象中的value当做yield参数，进行go函数递归，并执行生成器的next
6.  此时value将作为yield的返回值赋值给foo，执行go函数体
7.  此时it.next()值为undefined，因为它是最后一次，值一定是undefined，所以最后go函数返回undefined

***

***END***

***by wind-jyf***

