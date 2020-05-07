# 重写Promise

promise调用方法如下

```javascript
const p1 = new Promise(function(resolve,reject){
    resolve('success1');
    resolve('success2');
});
p1.then(function(value){  
    console.log(value); // success1
});
```

#### 那promise内部是如何实现的呢？

1. 大致步骤

* 三种状态之间的切换
* 在执行resolve函数或reject函数的时候，便会从一种状态转换为另一种状态，且将值保存起来
* promise接收 一个参数，是一个函数，称为executor，然后将resolve和reject当其参数
* 处理then，对其状态进行判断，如果状态为fulfilled或rejected，则执行相应的函数，并把值传入

2. 解决异步问题

* 因为异步的时候，状态并不会发生变化
* 在then中将相关的函数传入一个数组
* 在执行resolve时，便forEach执行数组中的函数

3. 解决 链式回调

* 在then中返回promise对象
* 但要对promise返回的对象以及在then中数据



#### 代码

```javascript
class Promise{
  constructor(executor){
    //初始化state为等待态
    this.state = 'pending';

    //成功的值
    this.value = undefined;

    //失败的值
    this.reason = undefined;

    //将then里的函数存放在数组中
    this.onResoledCallbacks = [];//存放成功的数组
    this.onRejectedCallbacks = [];//存放失败的数组
    let resolve = value=>{
      if(this.state === 'pending'){
        this.state = 'fulfilled';
        this.value = value;

        //一旦resolve执行，调用成功数组的函数
        this.onResoledCallbacks.forEach(fn=>fn());
      }
    };
    let reject = reason=>{
      if(this.state ==='pending'){
        this.state = 'rejected';
        this.reason = reason;

        //一旦reject执行，调用失败数组的函数
        this.onRejectedCallbacks.forEach(fn=>fn());
        
      }
    };
    try{
      executor(resolve,reject);
    }catch(err){
      reject(err);
    }
    
  }

  then(onFulfilled,onRejected){
    let promise2 = new Promise((resolve,reject)=>{
      if(this.state === 'fulfilled'){
        let x = onFulfilled(this.value);
        //resovePromise函数，处理自己return的promise和默认的promise的关系
        resolvePromise(promise2,x,resolve,reject);
      }
      if(this.state === 'rejected')
      {
        let x = onRejected(this.reason);
        resolvePromise(promise2,x,resolve,reject);
      }
      if(this.state ==='pending'){
        this.onResoledCallbacks.push(()=>{//解决异步问题
          let x = onFulfilled(this.value);
          resolvePromise(promise2,x,resolve,reject);
        })
  
        this.onRejectedCallbacks.push(()=>{
          let x = onRejected(this.reason);
          resolvePromise(promise2,x,resolve,reject);
        })
      }
    })

    return promise2;//解决链式回调问题
  }
}
```



未完。。。。。。。。

还有太多未理解未完成的地方

此文参考 https://juejin.im/entry/5b32f7026fb9a00e883f351b 