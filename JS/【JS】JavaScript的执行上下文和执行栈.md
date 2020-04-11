# JavaScript的执行上下文和执行栈

### 执行上下文类型

1. 全局执行上下文
2. 函数执行上下文
3. Eval执行上下文

当执行到一个函数的时候，就会进入准备工作，就叫做执行上下文

#### 执行上下文栈

1. 执行上下文的管理方式是用栈来管理
2. 当JavaScript引擎遇到脚本时，会创建一个全局的执行上下文并且入栈
3. 每当引擎遇到一个函数调用，就会为该函数创建一个新的执行上下文栈，并入栈
4. 当引擎执行完栈顶的函数，此函数的执行上下文就会从栈中弹出



#### 从代码中理解

```javascript
function fun3() {
    console.log('fun3')
}

function fun2() {
    fun3();
}

function fun1() {
    fun2();
}

fun1();
```

1. 首先遇到fun1执行，会将其入栈
2. 执行fun1
3. 遇到fun2执行，将其入栈
4. 执行fun2
5. 遇到fun3执行，将其入栈
6. 执行fun3，执行完毕，出栈
7. fun2执行完毕，出栈
8. fun1执行完毕，出栈



#### 一道面试题

```javascript
var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f();
}
checkscope();
```

```javascript
var scope = "global scope";
function checkscope(){
    var scope = "local scope";
    function f(){
        return scope;
    }
    return f;
}
checkscope()();
```

请问：上面这两段代码有什么不一样？

1. 两段代码的执行结果一样，但是执行上下文的顺序不一样
2. 第一段代码中，首先push checkscope，再push f，再pop f，最后pop checkscope
3. 第二段代码中，首先push checkscope，再pop checkscope，然后push f，最后pop f





参考链接： https://github.com/mqyqingfeng/Blog/issues/4 



之前看的时候很多地方不懂，今天再看的时候突然恍然大悟



***

***End***

***by wind-jyf***

