# 关于this

### 误解

##### 1.this指向函数自身

```javascript
function foo(num){
    console.log("foo:"+num);
    //记录foo被调用的次数
    this.count++;
}

foo.count = 0;
var i;
for(i=0;i<10;i++){
    if(i>5){
        foo(i);
    }
}
console.log(foo.count);
/*
输出：
foo:6
foo:7
foo:8
foo:9
0
*/
```

从以上例子便可以看出`this.count++`中的`this`并不指向foo

##### 2.它的作用域

许多人认为this指向函数的作用域，但有时是，有时不是

**确定的是，this在任何情况下都不指向函数的词法作用域**

```javascript
function foo(){
    var a = 2;
    this.bar();//this.bar is not a function
}

function bar(){
    console.log(this.a)
}
foo();
```

1. 在上面这个例子中，`this.bar`认为此时的this指向foo的作用域，也就是window，但事实证明不是
2. 包括`this.a`认为此时的this指向当前的foo作用域

但事实证明，以上两个假象都失败了，它企图利用this将foo和bar的作用域连接起来

### this是什么？

1. this是在函数调用时绑定的，它指向什么完全取决于函数在哪里被调用，所以，this和动态作用域有关，它的上下文取决于函数调用时的各种条件。
2. `函数调用`->`创建执行上下文`->`记录相关信息`->`this绑定其中的某个信息`
3. this既不指向函数自身，也不指向函数的词法作用域

### this绑定规则

#### 1.默认绑定

> 首先要介绍的是最常用的函数调用类型：独立函数调用。可以把这条规则看作是无法应用其他规则时的默认规则

```javascript
function foo(){
	console.log(this.a);
}
var a =2;
foo();//2
```

* 默认绑定在非严格模式下，绑定到全局
* 在严格模式下，为undefined

#### 2.隐式绑定

> 调用位置是否有上下文对象，或者说是否被某个对象拥有或者包含

```javascript
function foo(){
	console.log(this.a);
}
var obj2 = {
    a:42,
    foo:foo
}
var obj1 = {
    a:2,
    obj2:obj2
}
obj1.obj2.foo();//42
```

* 此时的this会绑定到这个上下文对象

* 但是某些情况会造成隐式丢失，来看下面这个例子

  ```javascript
  function foo(){
      console.log(this.a);
  }
  var obj = {
      a:2,
      foo:foo
  }
  var bar = obj.foo;//函数别名
  var a = "oops,global";//a是全局对象的属性
  bar();//"oops,global"
  ```

  * 此时的bar其实是foo的函数别名
  * 所以bar()其实是一个不带任何修饰的函数调用，因此应用了默认绑定

  注：参数传递也是一直隐式赋值，也可能造成隐式丢失

  ```javascript
  function foo(){
      console.log(this.a);
  }
  var obj = {
      a:2,
      foo:foo
  }
  var a = "oops,global";//a是全局对象的属性
  setTimeout(obj.foo,100);//"oops,global"
  ```

#### 3.显示绑定

> 使用call，apply，bind方法，以及API调用的“上下文”

* 这三种内置API均是改变this指向

```javascript
function foo(el){
    console.log(el,this.id);
}
var obj = {
    id:"awesome"
}
[1,2,3].forEach(foo,obj);
//1 awesome 2 awesome 3 awesome
```

1. 在`[1,2,3].forEach(foo,obj)`执行foo时，会把this绑定到obj
2. 实际上也是通过call或者apply实现了显示绑定

#### 4.new绑定

> 最后一种绑定方式，在new时，会改变函数中this的指向

使用new来调用函数，或者说发生构造函数调用时，会自动执行下面的操作

1. 创建（或者说构造）一个全新的对象
2. 这个对象会被[[原型]]连接
3. 这个新对象会绑定到函数调用的this
4. 如果函数没有返回其他对象，那么new表达式中的函数会自动返回这个新对象

#### 优先级

> new>显示>隐式>默认

但有时当你认为应用其他绑定规则时，实际上应用的可能是默认绑定规则

```javascript
function(){
	console.log(this.a);
}
var a = 2;
foo.call(null);//2
```

* 此时便会执行默认绑定规则

###### 间接引用

> 另一个需要注意的是，你有可能（有意或者无意地）创建一个函数的“间接引用”，在这种情况下，调用这个函数会应用默认绑定规则。

```javascript
function foo(){
    console.log(this.a);
}
var a = 2;
var o ={
    a:3,
    foo:foo
}
var p = {
    a:4
}
o.foo();//3
//(p.foo = o.foo)();//2
p.foo = o.foo;
p.foo();//4
```

### 总结

由以下顺序来判断this的绑定对象

1. 由new调用？绑定到新创建的对象
2. 由call，apply调用
3. 由上下文对象调用？绑定到上下文的对象
4. 默认：在严格模式下绑定到undefined，否则绑定到全局对象

***

***End***

***by wind-jyf***





