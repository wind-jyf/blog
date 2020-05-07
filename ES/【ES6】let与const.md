# let与const

#### let

* let声明的变量只在let命令所在的代码块内有效
* var在全局范围内均有效
* let不能重复声明，var可以声明多次
* for循环计数器很适合用let
* 不存在变量提升

###### let代码块有效，var全局有效

```javascript
{
    let a = 0;
    var b = 1;
}
console.log(a);//ReferenceError: a is not defined
console.log(b);
```

###### let只能声明一次

```javascript
let a = 1;
let a = 2;//SyntaxError: Identifier 'a' has already been
var b = 3;
var b = 4;
console.log(a); 
console.log(b);
```

###### for循环计数器

```javascript
for(var i=0;i<10;i++){
    setTimeout(function(){
        console.log(i);//输出十个10
    }) 
}
for(let j=0;j<10;j++){
    setTimeout(function(){
        console.log(j);//0123456789
    }) 
}
```

*注：var声明的i是全局的，所以每次的i都是循环结束后的值*

###### 变量提升

```javascript
console.log(b);//undefined
var b = "b";

console.log(a);//ReferenceError: Cannot access 'a' before initialization
let a = "a";
```

#### const

* const声明一个只读变量，声明之后不允许改变
* 一旦声明必须初始化
* 代码块内如果存在let或const，代码块会对这些命令声明的变量从块的开始就形成一个**封闭**的作用域，在声明变量前使用就会报错

```javascript
var PI = "a";
if(true){
  console.log(PI);  // ReferenceError: PI is not defined
  const PI = "3.1415926";
}
```

**注：const保证的是变量指向的内存地址保存的数据不允许变动，对于简单类型，值就保存在变量指向的内存地址，但对于复杂类型，变量指向的内存地址其实是保存了一个指向实际数据的指针，const只能保证指向的指针是固定的，但指针指向的数据结构就无法控制**



#### 补充：

* var的缺陷
  * 可以重复声明多次

  * 可以无限制的修改

  * 没有块级作用域



***

***END***

***by wind-jyf***

