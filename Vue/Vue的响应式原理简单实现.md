# Vue的响应式原理简单实现

## 一、响应式原理介绍

Vue是数据驱动视图实现双向绑定的一种前端框架，有数据层以及视图层，数据层（Model）仅仅是普通的JavaScript对象，当Modle更新后view层自动完成更新，同理view层修改会导致model层数据更新。

![](https://user-gold-cdn.xitu.io/2020/5/23/1723f773b8325326?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

## 二、响应式原理实现

先来看下我们的HTML文件

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div id="app">
        <input type="text" v-model = 'msg'>
    </div>
    <script src="./utils.js"></script>
    <script src="./watch.js"></script>
    <script src="./observe.js"></script>
    <script src="./compile.js"></script>
    <script src="./vue.js"></script>
    <script>
        let vm = new Vue({
            el:'#app',
            data:{
                msg:'学习MVVM实现原理',
            }
        })
    </script>

</body>
</html>
```



Vue实现响应式原理有这两个核心机制：

- 依赖于`Object.defineProperty()`实现数据劫持
- 订阅模式

首先来看一下大致的流程图，我们大概需要这么几个对象：

* Observer：对数据进行劫持
* Compile：对模板指令进行编译
* Watcher：观察者，对视图进行更新
* Dep：收集Watcher，并通知观察者更新

![](https://pic3.zhimg.com/80/v2-ee84f443fd3565fbf987974a7da5e2ee_1440w.jpg)

#### 第一步：模板编译（Compile的初步简单实现）

在模板编译的初步过程中，我们需要拿到各种指令，并根据指令去渲染页面。

需要完成的几大功能：

* 解析`v-model`指令，给input的value属性赋予相应的值，完成渲染
* 删除元素节点的`v-`属性

```javascript
const compileUtil = { //遍历工具函数对象
    getVal(name,vm){
        return vm.$data[name]; //其实还需要考虑嵌套的情况，这里简化操作了
    },
    updater:{
        modelUpdater(node,value){
            node.value = value;
            console.log(node);
        }
    },
    model(node,name,vm){
        let value = this.getVal(name,vm);
        this.updater.modelUpdater(node,value);
    }
}
class Compile{
    constructor(el,vm){
        this.el = this.isElementNode(el)?el:document.querySelector(el)//拿到根元素节点
        this.vm = vm;
        const fragment = this.node2Fragment(this.el);//获取当前的文档碎片对象，减少页面重流与重绘。
        
        //现在拿到了文档碎片对象，让我们来编译模板
        this.compile(fragment);
        //现在需要将已经编译完的子元素添加到根节点，进行渲染
        this.el.appendChild(fragment);
    }
    isElementNode(node){ //判断是否为元素节点
        return node.nodeType === 1;
    }
    node2Fragment(el){//此时传入的是根节点
        const f = document.createDocumentFragment();
        let firstChild;
        while(firstChild = el.firstChild){
            f.appendChild(firstChild);
        }
        return f;
    }
    isDirective(name){//判断是否为一个vue指令
        return name.startsWith('v-');//判断是否为v-开头
    }
    compileElement(node){//编译元素节点
        const attributes = node.attributes;//拿到元素节点的所有属性
        // console.log(node.attributes);
        [...attributes].forEach(attr=>{
            const {name,value} = attr;//拿到属性名称以及属性值
            if(this.isDirective(name)){//判断是否为一个v-开头指令
                //我们观察v-for,v-model,v-if，我们主要是想要拿到v-后面的值
                const [,dirctive] = name.split('-');//比如拿到了model
                compileUtil[dirctive](node,value,this.vm);//进行指令的编译
                 //我们已经拿到指令，并且指令已经编译完成，此时需要把指令从标签属性中进行删除
                node.removeAttribute('v-'+dirctive);
            }
        })
    }
    compile(fragment){//编译节点
        const childNodes = fragment.childNodes;//会拿到所有的节点，其中包括了元素节点、文本节点等等
        [...childNodes].forEach(child=>{
            if(this.isElementNode(child)){//元素节点
                this.compileElement(child);//如果是元素节点，进行相应的编译
            }else{
                //文本节点
            }
        })
    }
}
```

现在来看看我们实现的效果，此时`v-model='msg'`已经被渲染出来了，并且在input标签中也没有了相应的属性。

![image-20201020170814790](./img/1.png)

#### 第二步：数据拦截（Observer的初步简单实现）

1. `Object.defineProperty()`简单介绍

   我们知道，在JS对象上其实有两种内部属性，分别是**数据属性**和**访问器属性**。

   数据属性有：

   * `[[Configurable]]`：表示属性是否可以通过delete删除并定义，是否可以修改它的特性，以及是否可以把它改为访问器属性。
   * `[[Enumerable]]`：表示属性是否可以通过for-in循环返回。
   * `[[Writable]]`：表示属性的值是否可以被修改。
   * `[[Value]]`：包含属性实际的值。

   访问器属性有：

   * `[[Get]]`：获取函数，在读取属性时调用。
   * `[[Set]]`：设置函数，在写入属性时调用。

   但是如果我们某天想要修改属性的默认特性，该怎么办呢？这时就可以用到`Object.defineProperty()`了。

   现在我们来看一个栗子。

   `Object.defineProperty()`可以接收三个参数：要给其添加属性的对象、属性的名称和一个描述符对象。

   ```javascript
   let book = {
       year_:2017,
       edition:1
   }
   Object.defineProperty(book,"year",{
       get(){
           return this.year_;
       },
       set(newValue){
           this.year_ = newValue;
           this.edition +=newValue-2017;
       }
   })
   book.year = 2018;
   console.log(book.year);//2018
   console.log(book.edition);//2
   ```

   相信看到这里，大家已经对`Object.defineProperty`有了一定的了解，现在让我们来初步实现一下数据拦截吧。

2. 创建Observer对象，并对数据添加拦截

   ```javascript
   class Observe{
       constructor(data){ //data即我们的数据对象，也是我们需要进行拦截的对象。
           this.observe(data);
       }
       observe(data){
           if(data && typeof data === "object"){
               Object.keys(data).forEach(key=>{
                   this.definReactive(data,key,data[key]);
               })
           }
       }
       definReactive(data,key,value){
           this.observe(value);//如果对象进行嵌套的话，需要进行递归添加拦截
           Object.defineProperty(data,key,{
               enumerable:true,
               configurable:false,
               get(){
                   return value;
               },
               set:(newVal)=>{
                   this.observe(newVal);
                   if(newVal!= value){
                       console.log("数据要变化了")
                   }
               }
           })
       }
   }
   ```

   现在来看一下效果。

   ![image-20201020164624646](C:\Users\windjyf\AppData\Roaming\Typora\typora-user-images\image-20201020164624646.png)

这个时候，我们已经可以拦截到数据的变化了，但是当我们改变`msg`的值时，页面并没有进行相应的渲染，这是因为我们没有在`set`时做出相应的处理，现在让我们继续进行完善吧！

#### 第三步：添加消息订阅

当我们进行数据变化的时候，需要由**数据驱动视图**去发生变化，那么由谁去改变呢，这时我们就需要一个观察者。

这个观察者可以在数据变化时，去告诉视图，你这里要变了，那么，我们需要考虑几个问题：

1. 观察者应该什么时候被创建？
2. 在数据变化时，如何去通知观察者？

想要回答上述问题，我们先来了解一下消息订阅模式，我用一个简单的栗子来说明一下：

我们平时都去餐馆吃过饭，如果我们预定了一个包间，在去吃饭的时候，一般会有一个服务员是专门为我们服务的。

**第一点**，这个服务员只有在我们去吃饭的时候，才会专属于我们，即使我们预定了这个房间，但我们还没有去的时候，这个服务员可以说是还不存在。

**第二点**，比如我们点好了菜，这时需要进行上菜，消息订阅模式便是，厨房大喊一声，有菜做好了，来上菜。其实每个服务员在这个时候并不知道有没有自己的菜做好，但仍然需要去厨房看一下，如果有，就去上菜，如果没有，就不上菜。

通过上面这个栗子相信就可以很容易回答出上面的那两个问题了。

1. 我们应该是在数据需要驱动视图的时候，给这个数据添加一个观察者。
2. 我们需要一个`dep`去通知观察者，其实也就类似于上面例子中的厨房。

下面来看下代码是如何实现的。

* 首先在数据驱动视图变化时，添加观察者

  ```javascript
  const compileUtil = {
      getVal(name,vm){
          return vm.$data[name]; //其实还需要考虑嵌套的情况，这里简化操作了
      },
      model(node,name,vm){
          let value = this.getVal(name,vm);
          new Watcher(vm,name,(newVal)=>{ //添加观察者，并设置回调函数，在数据变化时，触发回调函数更新视图
              this.updater.modelUpdater(node,newVal);
          })
          this.updater.modelUpdater(node,value);
      },
      updater:{
          modelUpdater(node,value){
              node.value = value;
              console.log(node);
          }
      }
  }
  ```

* 观察者以及`Dep`的实现

  ```javascript
  class Watcher{
      constructor(vm,name,cb){ //name是属性名称，cb是回调函数，回调函数即主要用于试图的重新渲染
          this.vm = vm;
          this.name = name;
          this.cb = cb;
          this.oldVal = this.getOldVal();//先把旧值保存起来
      }
      update(){
          const newVal = compileUtil.getVal(this.name,this.vm);
          if(newVal!==this.oldVal){
              this.cb(newVal);
              this.oldVal = newVal;
          }
      }
      getOldVal(){
          Dep.target = this;
          const oldVal = compileUtil.getVal(this.name,this.vm);//在取值时，其实会触发get
          Dep.target = null;
          return oldVal;
      }
  }
  
  //发布订阅模式，发布订阅主要就是靠数组关系，发布就是往
  //数组里push，而发布就是让数组中的函数执行
  
  class Dep{
      constructor(){
          this.subs = [];//收集watcher
      }
      addSub(watcher){//添加观察者
          this.subs.push(watcher);
      }
      notify(){//通知所有的观察者去执行更新函数
          this.subs.forEach(item=>{
              item.update();
          })
      }
  }
  ```

* 在触发get时，向`dep`中添加观察者，在触发set的时候，去通知观察者更新

  ```javascript
  definReactive(data,key,value){
          this.observe(value);
          const dep = new Dep();
          Object.defineProperty(data,key,{
              enumerable:true,
              configurable:false,
              get(){
                  Dep.target && dep.addSub(Dep.target);//向dep中添加观察者
                  return value;
              },
              set:(newVal)=>{
                  this.observe(newVal);
                  if(newVal!= value){
                      value = newVal;
                      //console.log("数据要变化了")
                      dep.notify();//去通知观察者更新
                  }
              }
          })
      }
  ```

  在这里需要解答几个疑问。

  1. 为什么要在get的时候向`dep`中添加观察者？

     因为我们在创建观察者时，一定会触发get，所以在这里添加是最好的。

  2. 为什么要设置`Dep.target`？

     如果不设置`Dep.tartget`的话，我们每触发一次get，就会去向`dep`中添加观察者，那么肯定会有重复的观察者。

     在设置`Dep.tartget`之后，当我们向`dep`中添加观察者之后，就把`Dep.tartget`设置为null，之后即使再触发get，也不会再去重复添加了。只有当下一次添加watcher的时候，才会继续触发。

现在让我们来看一看效果。

![image-20201020184826523](C:\Users\windjyf\AppData\Roaming\Typora\typora-user-images\image-20201020184826523.png)

![image-20201020184844493](C:\Users\windjyf\AppData\Roaming\Typora\typora-user-images\image-20201020184844493.png)

这时就完成一大半啦，此时的数据已经可以驱动视图进行变化了，但是当我们对输入框的数据进行改变时，还仍不能驱动数据改变，下面就来进行双向绑定。

#### 第四步：实现双向绑定

其实双向绑定就是一个语法糖，我们只需要在input输入框添加监听事件，在获取到新值的时候，去对data对象进行相应的改变。

```javascript
const compileUtil = {
    getVal(name,vm){
        return vm.$data[name]; //其实还需要考虑嵌套的情况，这里简化操作了
    },
    setVal(name,vm,newVal){
        vm.$data[name] = newVal;//去改变data中的值
        
    },
    model(node,name,vm){
        let value = this.getVal(name,vm);
        new Watcher(vm,name,(newVal)=>{
            this.updater.modelUpdater(node,newVal);
        })
        node.addEventListener('input',e=>{//添加了监听的事件
            this.setVal(name,vm,e.target.value);
        })
        this.updater.modelUpdater(node,value);
    },
    updater:{
        modelUpdater(node,value){
            node.value = value;
            //console.log(node);
        }
    }
}
```

来看下效果

![image-20201020185515668](C:\Users\windjyf\AppData\Roaming\Typora\typora-user-images\image-20201020185515668.png)

这时可以看到，视图已经驱动了数据进行了变化。但我们还剩最后一步，我们在使用vue时，往往通过`this.msg`便可以拿到数据，现在我们来做一下代理。

#### 第五步：给this添加代理

其实仍然是使用`Object.defineProperty()`来实现。

```javascript
class Vue{
    constructor(options){
        this.options = options;
        this.$el = options.el;//拿到所在节点的id值
        this.$data = options.data;//拿到数据对象
        if(this.$el){
            new Observe(this.$data);
            new Compile(this.$el,this);
            this.proxyData(this.$data);
            console.log(this.msg);//这时就可以直接打印出值了
        }
    }
    proxyData(data){
        for(const key in data){
            Object.defineProperty(this,key,{ //给this添加代理
                get(){
                    return data[key];
                },
                set(newVal){
                    data[key] = newVal;
                }
            })
        }
    }
}

```



## 参考：

* [【前端发动机】深入 Vue 响应式原理，活捉一个 MVVM（超详细！）](https://zhuanlan.zhihu.com/p/61915640)
* [Vue响应式原理](https://juejin.im/post/6844904166364545037#heading-0)



