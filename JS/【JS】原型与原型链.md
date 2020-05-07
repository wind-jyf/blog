# 原型与原型链

先来放张图片

![1](E:\blog\source\images\1.png)

#### 要点

* prototype
* \_proto_
* constructor
* 实例与原型
* 原型链
* 继承
* new运算符的实现

#### prototype

1. JS是一种基于原型的语言，每个对象拥有一个原型对象
2. 对象以其原型为模板，从原型继承方法和属性
3. 这些属性和方法定义在对象的构造器函数的prototype属性上，而非对象实例本身

###### 构造函数与其原型的关系

![2 ](E:\blog\source\images\2 .png)

* 每个函数都会有一个prototype属性，并且这个属性指向了一个对象
* 并且在new的时候，将这个对象设为此实例的原型，也就是\_proto_的指向

#### \_proto_

* 每一个JS对象（除了null）都具有的一个属性，叫\_proto_
* 这个属性会指向该对象的原型

注：实例对象和构造函数均可以指向原型，那原型是否有属性指向构造函数或实例呢？

#### constructor

* 原型可以通过constructor指向构造函数
* 但是原型不可以指向实例

#### 实例与原型

* 当读取实例的属性时，如果找不到，就会查找原型中的属性，一直向上查找

  ```javascript
  function parent3(age){
      return{
          age
      }
  }
  
  var p3 = parent3(50);
  console.log(p3.constructor);//[Function: Object]
  ```

  注：其实在实例中，并没有constructor属性，于是查找其原型，发现有constructor属性，且指向构造函数

#### 原型链

* 刚刚说原型也是一个对象，那么原型的原型是什么呢
* 对象和构造函数不同，所以原型链其实是通过\_proto_实现的
* 理解构造函数与对象的区别
* 构造函数也就是一个函数，每个函数都会有prototype属性指向原型对象
* 而每个对象都会有\_proto_属性，不会指向构造函数，只会指向对象

#### 继承

继承其实意味着赋值操作，但是JS并不会赋值对象的属性，只是在两个对象之间创建一个关联，所以另一个对象可以通过委托访问另一个对象的属性和函数

###### instanceof

* instanceof的原理是判断其原型是否在原型链上

```javascript
function Foo(){
    return 'foo';
}
Foo.prototype.method = function(){
    return 'method';
}
function Bar(){
    return 'bar';
}
const foo = new Foo();
Bar.prototype = foo; //继承
const bar = new Bar();
console.log(bar instanceof Foo);//true

//因为Object.getPrototypeOf(bar) === Foo.prototype
```

* 重写instanceof

```javascript
function instanceof_of(L,R){
    var O = R.prototype;
    L = Object.getPrototypeOf(L);
    while(true){
        if(L === null){
            return false  //找到原型链的最底层，也未找到，所以不在其原型链上
        }
        if(O === L){
            return true //一旦找到，便返回true
        }
        L = Object.getPrototypeOf(L);//顺着原型链向下找
    }
}
function C(){} 
function D(){} 

var o = new C();

console.log(instanceof_of(o, C)); // true
console.log(instanceof_of(o, D)); // false
```

* 使用new实现继承

```javascript
function Animal(){
    this.value = 'animal';
}

Animal.prototype.run = function(){
    return this.value +' c'+ 'is running';
}

function Cat(){}

//这里是关键，创建Animal的实例，并将该实例，并将该实例赋值给Cat.prototype
//相当于Cat.prototype._protp_ = Animal.prototype
Cat.prototype = new Animal();
const cat = new Cat();
console.log(cat.value);//animal
```

图解：绿色这条链便是原型链继承

![3](E:\blog\source\images\3 .png)

#### new实现

new创建的实例有两大特性

* 访问到构造函数里的属性
* 访问原型链里的属性

模拟实现：当new Foo()执行时，会发生以下事情：

1. 一个继承自Foo.prototype的新对象被创建

2. 使用指定参数调用构造函数

3. 由构造函数返回的对象就是new表达式的结果。如果

   构造函数没有显式返回一个对象，则使用步骤一创建的对象



```javascript
function create(){
     //新建空对象
     var obj = new Object();

     //获得构造函数,arguments中去除第一个参数
     Con = [].shift.call(arguments);//也就是说，对arguments执行shift方法
     //Con拿到了第一个参数即构造函数，并且arguments删除了第一个参数

     //原型链进行链接
     Object.setPrototypeOf(obj,Con.prototype);

     //绑定this实现继承，obj可以访问到构造函数中的属性
     Con.apply(obj,arguments);

     //返回对象
     return obj;
 }

 function Car(color){
     this.color = color;
 }

 Car.prototype.start = function(){
     console.log(this.color + " car start");
 }

 var car = create(Car,"black");
 console.log(car.color);//black
 car.start();//black car start
```

#### 总结：

1. 理解构造函数的原型和对象的原型并不是一回事
2. 原型链是基于对象上的，和构造函数无关，所以和prototype无关
3. 函数本身就会有prototype属性，指向一个对象。new实例的时候，需要将实例的原型链链上构造函数所指的对象
4. 继承并不是复制属性，而是将两者存在一种关系，连接起来，可以访问，原型链继承就是这样实现的。



***

***End***

***by wind-jyf***

 