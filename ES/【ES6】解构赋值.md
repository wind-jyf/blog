# 解构赋值

#### 规则：

* 左右两边结果必须一样
* 右边必须是个东西
* 声明和赋值不能分开（必须在一句话里完成）

#### 剩余运算符

```javascript
let [a,...b] = [1,2,3];
console.log(a);//1
console.log(b);//[ 2, 3 ]
```

注：

1. 剩余参数必须放在最后
2. 剩余符号还可以用来展开数组



#### 解构默认值

```javascript
let [a = 2] = [undefined]; // a = 2
```

当解构模式有匹配结果，但匹配结果是undefined时，会触发默认值作为返回结果

```javascript
let [a = 3, b = a] = [];     // a = 3, b = 3
let [a = 3, b = a] = [1];    // a = 1, b = 1
let [a = 3, b = a] = [1, 2]; // a = 1, b = 2
```

1. a与b匹配值为undefined，触发默认值
2. b触发默认值
3. 不触发默认值



#### 对象模型的解构

* 属性值必须相等才能匹配
* 顺序不用一致

```javascript
let {foo,bar} = {bar:'aaa',foo:'bbb'};
console.log(foo);//bbb
console.log(bar);//aaa
```

```javascript
let {foo:bar} = {foo:'bbb'};
//console.log(foo); 会报错，说foo未定义
console.log(bar);//bbb
```



#### 嵌套

```javascript
let obj = {p: ['hello', {y: 'world'}] };
let {p: [x, { y }] } = obj;
obj = {p: ['hello', {y: 'helo'}] };
console.log(x,y);//hello world
```

还可以省略值

```javascript
let obj = {p: ['hello', {y: 'world'}] };
let {p: [x, {  }] } = obj;
console.log(x);//hello
```



#### 不完全解构

* 未解构的，返回undefined

```javascript
let obj = {p: [{y: 'world'}] };
let {p: [{ y }, x ] } = obj;
console.log(x,y);//undefined world
```



***

***End***

***by wind-jyf***

