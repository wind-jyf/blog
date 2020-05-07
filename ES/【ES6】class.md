# class

#### 基础用法

```javascript
class Example{
    constructor(name){
        this.name = name;
    }
    static sum(a,b){
        console.log(a+b);
    }
}
class Child extends Example{
    constructor(name){
        super(name);
    }
}
Exmple.sum(1,2);
const example = new Example('jyf');
const child = new Child('jyf');
```



#### Babel是如何编译Class

1. 编译（一）	

```javascript
//ES6代码
class Person {
    constructor(name) {
        this.name = name;
    }
}
```

Babel编译后

```javascript
"use strict";

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var Person = function Person(name) {
    _classCallCheck(this, Person);//判断此时this的指向

    this.name = name;
};
```

注：_classCallCheck方法就是用来判断此时this的指向，也就是说，判断是否是通过new实现的

2. 编译（二）

```javascript
//ES6代码
class Person {
    // 实例属性
    foo = 'foo';
    // 静态属性
    static bar = 'bar';

    constructor(name) {
        this.name = name;
    }
}
```

Babel编译后

```javascript
'use strict';

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var Person = function Person(name) {
    _classCallCheck(this, Person);

    this.foo = 'foo';//实例属性

    this.name = name;//构造函数内的属性
};

Person.bar = 'bar';//添加静态属性
```

3. 编译（三）

```javascript
class Person {
    constructor(name) {
        this.name = name;
    }

    sayHello() { //编译后被添加到原型
        return 'hello, I am ' + this.name;
    }

    static onlySayHello() {//添加到构造函数
        return 'hello'
    }

    get name() {  //添加到原型
        return 'kevin';
    }

    set name(newName) {//添加到原型
        console.log('new name 为：' + newName)
    }
}
```

Babel编译后

```javascript
'use strict';

var _createClass = function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
    };
}();

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var Person = function() {
    function Person(name) {
        _classCallCheck(this, Person);

        this.name = name;
    }

    _createClass(Person, [{
        key: 'sayHello',
        value: function sayHello() {
            return 'hello, I am ' + this.name;
        }
    }, {
        key: 'name',
        get: function get() {
            return 'kevin';
        },
        set: function set(newName) {
            console.log('new name 为：' + newName);
        }
    }], [{
        key: 'onlySayHello',
        value: function onlySayHello() {
            return 'hello';
        }
    }]);

    return Person;
}();
```

注：_createClass一共有三个参数，分别是构造函数，需要添加到原型上的函数数组，需要添加到构造函数本身的函数数组

4. 编译（四）

```javascript
//ES6代码
class Parent {
    constructor(name) {
        this.name = name;
    }
}

class Child extends Parent {
    constructor(name, age) {
        super(name); // 调用父类的 constructor(name)
        this.age = age;
    }
}

var child1 = new Child('kevin', '18');

console.log(child1);
```

在使用Babel编译这段代码之前，需要理解ES6中的原型链：

* class同时有 prototype 属性和 \__proto__ 属性 
* 有两条继承链
*  子类的\__proto__ 属性，表示构造函数的继承，总是指向父类 
*  子类 prototype 属性的 \__proto__ 属性，表示方法的继承，总是指向父类的 prototype 属性 

Babel编译后

```javascript
'use strict';

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
    //上面为设置prototype这条链
    //下面为设置_proto_这条链
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

var Parent = function Parent(name) {
    _classCallCheck(this, Parent);

    this.name = name;
};

var Child = function(_Parent) {
    _inherits(Child, _Parent);//连接prototype这条链以及_proto_这条链

    function Child(name, age) {
        _classCallCheck(this, Child);

        // 调用父类的 constructor(name)
        var _this = _possibleConstructorReturn(this, (Child.__proto__ || Object.getPrototypeOf(Child)).call(this, name));

        _this.age = age;
        return _this;
    }

    return Child;
}(Parent);

var child1 = new Child('kevin', '18');

console.log(child1);
```

* 通过\_inherits方法，连接prototype这条链以及\_proto_这条链
* 通过\_possibleConstructorReturn方法，调用父类的构造函数，并对this的指向进行修改
* 这也是为什么super要在this前使用的原因，因为在编译时，会对this进行修改





***

***End***

***by wind-jyf***

