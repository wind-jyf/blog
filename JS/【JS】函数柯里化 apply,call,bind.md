# 函数柯里化 apply,call,bind

#### 函数柯里化

先上一道题目，如何设计一个函数完成下列计算

```javascript
console.log(add(1, 2, 3));
console.log(add(1)(2)(3));
console.log(add(1, 2)(3));
console.log(add(1)(2, 3));
```

##### 思路

1. 均是想要进行三个数相加
2. 但是参数不同
3. 可以不断的返回函数，得到后一个参数，直到把所有的参数均读取完成
4. 获取所有参数后，执行相加的操作

##### 实现

```javascript
const curry = function(fn, ...args) {
    if(args.length >= fn.length){
        return fn(...args)  //以获取完所有参数
    }else{
        return function(..._args){  //add的值，进行参数的获取
            return curry(fn, ...args, ..._args);
        }
    }
}
    
function add1(x, y, z) {
    return x + y + z;
}
const add = curry(add1);//add是curry这个函数，而不是curry的返回值
console.log(add(1, 2, 3));
console.log(add(1)(2)(3));
console.log(add(1, 2)(3));
console.log(add(1)(2, 3));
```

* 首先add1便是相加的函数，它作为curry的参数传入，最后便于执行
* add被赋值了之后，其实是被返回了一个函数，而且此函数内部return了curry函数
* 在执行curry函数时，首先判断是否获取完所有的参数
* 如果没有，便通过返回函数来获取下一步参数
* 如果获取完毕，则调用相加方法

##### 小结

1. 首先要判断参数是否获取完成
2. 通过返回一个函数，再进行不断的调用获取参数



#### call,apply,bind实现

##### 思路

1. 获取方法
2. 将方法加入到新对象中
3. 对方法进行调用

##### 实现call

```javascript
Function.prototype.myCall = function(thisArg = window) {
    
    // thisArg为新对象，并获取当前的函数
    thisArg.fn = this;
    // 第一个参数为 this，所以要取剩下的参数
    const args = [...arguments].slice(1);
    // 执行函数
    const result = thisArg.fn(...args);
    // thisArg上并不存在fn，所以需要移除
    delete thisArg.fn;
    return result;
}

function foo() {
    console.log(this.name);
}
const obj = {
    name: 'litterStar'
}
const bar = function() {
    foo.myCall(obj);
}
bar();
```



##### apply的实现

* 和call只是参数不同

```javascript
Function.prototype.myApply = function(thisArg = window) {
    thisArg.fn = this;
    let result;
    // 判断是否有第二个参数
    if(arguments[1]) {
        // apply方法调用的时候第二个参数是数组，所以要展开arguments[1]之后再传入函数
        result = thisArg.fn(...arguments[1]);
    } else {
        result = thisArg.fn();
    }
    delete content.fn;
    return result;
}
```



##### bind的实现

* bind会返回一个函数
* 新函数的this指向应为参数的第一个
* 其余参数作为新函数的参数

```javascript
Function.prototype.myBind = function(thisArg) {
    const fn = this;
    const args = [...arguments].slice(1);
    // 返回一个新的函数
    return function() {
        // 再次获取新的参数
        const newArgs = [...arguments];
        /**
         * 1.修改当前函数的this为thisArg
         * 2.将多次传入的参数一次性传入函数中
        */
        return fn.apply(thisArg, args.concat(newArgs))
    }
}

const obj1 = {
    name: 'litterStar',
    getName() {
        console.log(this.name)
    }
}
const obj2 = {
    name: 'luckyStar'
}

const fn = obj1.getName.myBind(obj2)
fn(); // luckyStar
```

##### 小结

* bind其实就是在返回函数中进行call或者apply，也就是this指向的改变
* this指向的改变，均是将其方法加入到新对象中



***

***End***

***by wind-jyf***

