# Reflect与Proxy

* Proxy可以对目标对象的读取、函数调用等操作进行拦截
* Reflect可以获取目标对象的行为

#### Proxy

* 一个Proxy对象由两部分组成：target、handler
* target即目标对象
* handler是一个对象，声明了代理target的指定行为

###### 基本用法

```javascript
let target = {
    name: 'Tom',
    age: 24
}
let handler = {
    get: function(target, key) {
        console.log('getting '+key);
        return target[key]; // 不是target.key
    },
    set: function(target, key, value) {
        console.log('setting '+key);
        target[key] = value;
    }
}
let proxy = new Proxy(target, handler)
proxy.name     // 实际执行 handler.get
proxy.age = 25 // 实际执行 handler.set
// getting name
// setting age
// 25
```

###### 实例方法

```javascript
get(target,propKey,receiver)//拦截点运算
```

```javascript
set(target,propKey,value,receiver)//拦截赋值
```

* get方法可以继承
* receiver表示原始操作行为所在对象，一般是Proxy实例本身

```javascript
const handler = {
    set: function(obj, prop, value, receiver) {
        obj[prop] = receiver;
    }
};
const proxy = new Proxy({}, handler);
proxy.name= 'Tom';
proxy.name=== proxy // true
 
const exam = {}
Object.setPrototypeOf(exam, proxy)
exam.name = "Tom"
exam.name === exam // true
```

**注：不是太理解**

```javascript
apply(target,ctx,args)//拦截参数，返回值
```

* target表示目标对象
* ctx表示目标对象上下文
* args表示目标对象的参数数组

```javascript
function sub(a, b){
    return a - b;
}
let handler = {
    apply: function(target, ctx, args){
        console.log('handle apply');
        return Reflect.apply(...arguments);
    }
}
let proxy = new Proxy(sub, handler)
console.log(proxy(3, 1));//2
```

注：自我理解其实就是拦截掉对象的参数，此对象可能是函数等等

```javascript
has(target,propKey)//拦截存在判断
```

```javascript
let  handler = {
    has: function(target, propKey){
        console.log("handle has");
        return propKey in target;
    }
}
let exam = {name: "Tom"}
let proxy = new Proxy(exam, handler)
'name' in proxy
// handle has
// true
```

注：当在判断target对象是否存在propKey属性时，会被此方法拦截，但此方法不拦截for.....in循环

```javascript
construct(target,args)//拦截new命令，返回值为对象
```

```javascript
deleteProperty(target,propKey)//拦截delete，如果此方法抛出错误或false，propKey就无法删除
```

```javascript
getOwnPropertyDesccriptor(target,propKey)//拦截属性描述对象或者undefined
```

```javascript
getPrototypeOf(target)//拦截对象原型的操作
```

#### Reflect

* ES6中将Object的一些明显属于语言内部的方法移植到Reflect对象

###### 静态方法

```javascript
Reflect.get(target,name,receiver)
```

```javascript
let exam = {
    name: "Tom",
    age: 24,
    get info(){
        return this.name + this.age;
    }
}
Reflect.get(exam, 'name'); // "Tom"
```

注：当target不是对象时，会报错

```javascript
Reflect.set(target,name,value,receiver)
```

注：此方法的返回值为Boolean

```javascript
Reflect.has(obj,name)//查找name属性在obj对象中是否存在
```

```javascript
Reflect.construct(obj,args)//类似于构造函数，返回值为obj
```

```javascript
Reflect.apply(Math.max,Math,[1,3,5,3,1]);//5
```

```javascript
Reflect.defineProperty(target,propertyKey,attributes)//用于为目标对象定义属性
```

#### 组合使用

```javascript
let exam = {
    name: "Tom",
    age: 24
}
let handler = {
    get: function(target, key){
        console.log("getting "+key);
        return Reflect.get(target,key);
    },
    set: function(target, key, value){
        console.log("setting "+key+" to "+value)
        Reflect.set(target, key, value);
    }
}
let proxy = new Proxy(exam, handler)
proxy.name = "Jerry"
proxy.name
// setting name to Jerry
// getting name
// "Jerry"
```

***

***End***

***by wind-jyf***

