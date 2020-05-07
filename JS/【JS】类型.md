# 类型

### 一、JavaScript七种内置类型

* 空值（null）
* 未定义（undefined）
* 布尔值（boolean）
* 数字（number）
* 字符串（string）
* 对象（object）
* 符号（symbol，ES6新增）

1. 除对象之外，其他统称类型称为基本类型
2. 使用typeof返回的是类型的字符串值

```javascript
typeof undefined === "undefined";//true
typeof true === "boolean";//true
typeof 42 === "number";//true
typeof "42" === "string";//true
typeof {life:42} === "object";//true

//ES6中新增加入的类型
typeof Symbol() === "symbol";//true
```

3. 在JavaScript中还存在一个bug

```javascript
typeof null === "object";//true
```

其实正确的返回结果应该是null，但是由于在判断是什么 类型时，是根据底层二进制开头的数字所判断。当以00开头时，便为object，但是null的所对应的二进制为全0，便判断为object。

### 二、值和类型

> JavaScript中的变量是没有类型的，只有值才有。变量可以随时持有任何类型的值。

* 换句话说，变量没有类型，值才有类型
* 对变量执行typeof操作时，得到的结果并不是该变量的类型，而是该变量持有值的类型，因为JavaScript中的变量没有类型。

##### undefined和undeclared

变量在未持有值的时候为undefined。

```javascript
var a;
typeof a === "undefined";//true
typeof b === "undefined";//true
```

但是typeof对于未声明过的变量，也会返回undefined。

很多开发人员将undefined和undeclared混为一谈，但在JavaScript中它们是两码事，undefined是值的一种。undeclared则表示变量从未声明过。

### 三、内置类型

* 数组
* 字符串
* 数字

##### 3.1数组

1. 使用delete运算符可以将单元从数组中删除，但是删除之后，数组的长度并不会发生变化。
2. 数组可以通过数字进行索引，但它们也是对象，所以也可以包含字符串键值和属性（但这些并不计算在数组之内）

```javascript
var a = [];
a[0] = 1;
a["footbar"] = 2;
a.length;//1
```

##### 3.2字符串

1. 字符串经常被当做数组
2. JavaScript中的字符串是不可变的，而数组是可变的
3. 字符串不可变的指字符串的成员函数不会改变其原始值，而是创建并返回一个新的字符串。而数组的成员函数都是在原始值上进行操作

```javascript
a = "foo"
c= a.toUpperCase();
a === c;//false
b = [];
b.push("!");
b;//[!]
```

##### 3.3数字

> JavaScript中没有真正意义上的整数，JavaScript中的“整数”就是没有小数的十进制数。所以42.0等同于“整数”42

1. 默认情况下大部分数字都以十进制显示，小数部分最后面的0被省略

```javascript
var a = 42.300;
var b = 42.0;
a;//42.3
b;//42
```

2. 由于数字值可以使用Number对象进行封装，因此数字值可以调用Number.prototype中的方法

```javascript
var a = 42,59;
a.toFixed(0);//43
a.toFixed(3);//42.590
```

3. `0.1+0.2 != 0.3`

由于JavaScript遵循IEE753标准，可以使用Number.Epsilon来解决

```javascript
function numbersClose(n1,n2){
    return Math.abs(n1-n2)<Number.EpsiLon;
}
var a =0,1+0.2;
var b = 0.3;
numbersClose(a,b);//true
```

##### 3.4特殊的值

* null指空值（曾赋过值，但是目前没有值）
* undefined指没有值（从未赋过值）
* NaN（不是一个数字）

“不是数字的数字”仍然是数字类型

```javascript
var a = 2 / "foo";//NaN
typeof a === "number";//true
```

可以使用内置工具函数isNaN()来判断，但它的检测方式过于死板，当检测参数不是NaN，也不是数字时，Number.isNaN改变了这一缺陷

```javascript
var a = 2 / "foo";//NaN
var b = "foo";
window.isNaN(a);//true
window.isNaN(b);//true
```



***

***End***

***by wind-jyf***

