# 实现一个简易的Vue

#### HTML文件引入

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
        <h1>{{person.name}} -----{{person.age}}</h1>
        <h3>{{person.fav}}</h3>
        <ul>
            <li>1</li>
            <li>2</li>
            <li>3</li>
        </ul>
        <h3>{{msg}}</h3>
        <div v-text = 'msg'></div>
        <div v-html = 'htmlStr'></div>
        <input type="text" v-model = 'msg'>
    </div>
    <script src="./Observer.js"></script>
    <script src="./Mvue.js"></script>
    <script>
        let vm = new MVue({
            el:'#app',
            data:{
                person:{
                    name:'jyf',
                    age:20,
                    fav:'姑娘'
                },
                msg:'学习MVVM实现原理',
                htmlStr:'htmlStr'
            }
        })
    </script>

</body>
</html>
```

#### MVue入口

1. 首先，要新建一个类MVue
2. 将其参数初始化
3. new Observer
4. new Compile
5. 设置相关代理

```javascript
class MVue{
    constructor(options){
        this.$el = options.el;
        this.$data = options.data;
        this.$options = options;
        if(this.$el){
            //1.实现一个数据的观察者
            new Observer(this.$data);
            
            //2.实现指令的解析器
            new Compile(this.$el,this);//把挂载的节点传入以及整个MVue类
            this.proxyData(this.$data);//设置相关代理，即使用this可以代替this.$data
        }
    }
    proxyData(data){
        for(const key in data){
            Object.defineProperty(this,key,{
                get(){
                    return data[key]
                },
                set(newVal){
                    data[key] = newVal;
                }
            })
        }
    }
}
```

#### Observer

1. 主要进行数据拦截
2. 并且在每次get时，向dep(观察者收集器)中添加观察者
3. 在set时，通知dep去告诉观察者更改数据，再驱动视图进行更改

```javascript
class Observer{
    constructor(data){
        this.observer(data);
    }

    observer(data){  //如果是对象的话，就逐层进行数据代理
        if(data && typeof data === 'object'){
            Object.keys(data).forEach(key=>{//遍历第一层的key
                this.defineReactive(data,key,data[key]);
            })
        }
    }

    defineReactive(data,key,value){   //设置相关代理
        //递归遍历
        this.observer(value);
        const dep = new Dep();
        Object.defineProperty(data,key,{
            enumerable:true,
            configurable:false,
            get(){
                //订阅数据变化时，往dep中添加观察者
                Dep.target && dep.addSub(Dep.target);
                return value;
            },
            set:(newVal)=>{
                this.observer(newVal);//如果新值是一个对象，需要将对象加入监听
                if(newVal !== value){
                    value = newVal;
                    //告诉Dep通知变化
                    dep.notify();
                }
            }
        })
    }
}
```

刚刚说，在进行 get时，需要用到dep，在set时，同样需要用到dep，dep旧仿佛是observe和watcher之间的一个桥梁，那么dep是如何实现的呢，以及watcher是如何实现的呢？

#### dep

1. dep作为一个watcher收集器，要有一个数组进行存放
2. 拥有相应的方法去添加观察者
3. 拥有相应的方法去通知观察者

```javascript
class Dep{
    constructor(){
        //收集watcher
        this.subs = [];
    }
    //收集观察者
    addSub(watcher){
        this.subs.push(watcher);
    }
    //通知观察者更新
    notify(){
        this.subs.forEach(item=>{
            item.update()
        })
    }
}
```

#### watcher

1. 观察者需要的通知更新视图，所以和Compile有一定关系，当然也要和dep相关联
2. 在获得旧值时，将当前watcher保存起来，由于get了值，会触发observe，通知dep添加watcher，添加之后，再讲保存的空间设为null
3. 在进行更新视图时，需要先判断值是否发生变化，如果发生变化，我们就设置相关的回调把新值给Compile

```javascript
class watcher{
    constructor(vm,expr,cb){
        this.vm = vm;
        this.expr = expr;
        this.cb = cb;
        //先把旧值保存起来
        this.oldVal = this.getOldVal();//只要new watcher就会把此watcher放入dep
    }
    update(){
        //1.判断新值和旧制是否有变化
        const newVal = compileUtil.getVal(this.expr,this.vm);//获取相应的值
        if(newVal !== this.oldVal){
            this.cb(newVal);
        }
    }
    getOldVal(){//获得值
        Dep.target = this;
        const oldVal = compileUtil.getVal(this.expr,this.vm);
        Dep.target = null;
        return oldVal;
    }
}
```

由于每一个属性，每一个值都需要对应相关的watcher，所以我们应该在编译每一个标签时，进行new watcher，下面我们来看一下Compile是如何实现的，也是我认为整个过程中最麻烦的一步。

#### Compile

1. 将文档碎片化
2. 获取整个dom元素
3. 对于元素节点和文本节点分别处理
4. 对其调用相应的节点编译方法进行编译

```javascript
class Compile{
    constructor(el,vm){
        this.el = this.isElementNode(el)?el:document.querySelector(el);//获取整个节点对象
        this.vm = vm;//获取整个vue对象
        //1.获取当前的文档碎片对象,放入内存中，减少页面的回流以及重绘
        const fragment = this.node2Fragment(this.el);
        
        //2.编译模板
        this.compile(fragment);
        //追加子元素到根元素
        this.el.appendChild(fragment);
        console.log(this.el);
    }
    compile(fragment){
        //1.获取每一个子节点
        const childNodes = fragment.childNodes;
        [...childNodes].forEach(child=>{
            //console.log(child);
            if(this.isElementNode(child)){//是元素节点,编译元素节点
                //console.log(child)
                this.compileElement(child);
            }else{
                //文本节点
                //编译文本节点
                //console.log(child);
                this.compileText(child);
            }
            if(child.childNodes && child.childNodes.length){
                this.compile(child);
            }
        })
    }
    compileElement(node){//对元素节点进行编译，主要是为了取出相关指令
        console.log(node);
        const attributes =  node.attributes;
        //console.log(attributes);
        [...attributes].forEach(attr=>{
            //console.log(attr);
            const {name,value} = attr;
            if(this.isDirective(name)){//是一个指令
                const [,dirctive] = name.split('-')//text html model on:click
                const [dirName,eventName] = dirctive.split(':'); //对于双重的进行分割
                //更新数据 数据驱动视图
                compileUtil[dirName](node,value,this.vm,eventName)

                //删除指令的标签上的属性
                node.removeAttribute('v-'+dirctive);
            }
        })
    }
    compileText(node){//对文本节点进行编译
        //{{}}
        const content = node.textContent;
        if(/\{\{(.+?)\}\}/.test(content)){//匹配双大括号
            compileUtil['text'](node,content,this.vm);
        }
    }
    isDirective(attrName){ //判断标签属性是否为v-开头
        return attrName.startsWith('v-');
    }
    node2Fragment(el){//此时传入的是根节点
        //创建文档碎片，将子节点循环放入
        const f = document.createDocumentFragment();
        let firstChild;
        while(firstChild = el.firstChild){
            f.appendChild(firstChild);//appendChild会进行自动移动进行遍历
        }
        return f;
    }
    isElementNode(node){//判断是否为元素节点
        return node.nodeType === 1;
    }
}
```

##### compileUtil

1. 提供相应元素编译的方法
2. 并在编译的同时，设置watcher，以及在每次watcher回调后，更新视图
3. 在model中设置双向数据绑定

```javascript
const compileUtil = {
    getVal(expr,vm){//获取数据
        return expr.split('.').reduce((data,currentVal)=>{
            return data[currentVal]
        },vm.$data)
    },
    setVal(expr,vm,inputVal){
        return expr.split('.').reduce((data,currentVal)=>{
            data[currentVal] = inputVal;
        },vm.$data)
    },
    getContentVal(expr,vm){
        value = expr.replace(/\{\{(.+?)\}\}/g,(...args)=>{
            return this.getVal(args[1],vm);
        })
        return value;
    },
    
    
    text(node,expr,vm){//expr:msg,当然,expr也有可能是一个对象
        let value;
        if(expr.indexOf('{{') !=-1){//处理双大括号
            value = expr.replace(/\{\{(.+?)\}\}/g,(...args)=>{
                new watcher(vm,args[1],()=>{
                    this.updater.textUpdater(node,this.getContentVal(expr,vm));
                })
                return this.getVal(args[1],vm);
            })                                                                           
        }else{
            value = this.getVal(expr,vm);//取到data中的相关数据
        }
        this.updater.textUpdater(node,value);
    },
    html(node,expr,vm){
        const value = this.getVal(expr,vm);
        new watcher(vm,expr,(newVal)=>{
            this.updater.htmlUpdater(node,newVal);
        })
        this.updater.htmlUpdater(node,value);
    },
    model(node,expr,vm){
        const value = this.getVal(expr,vm);
        //绑定更新函数 数据驱动视图
        new watcher(vm,expr,(newVal)=>{
            this.updater.modelUpdater(node,newVal);
        })
        //视图->数据->视图
        node.addEventListener('input',e=>{//监听input的输入事件
            //设置值
            this.setVal(expr,vm,e.target.value);
        })
        this.updater.modelUpdater(node,value);
    },
    on(node,expr,vm,eventName){
        let fn = vm.$options.methods && vm.$options.methods[expr];
        node.addEventListener(eventName,fn.bind(vm),false); //绑定this指向
    },
    //更新的对象
    updater:{
        textUpdater(node,value){
            node.textContent = value;
        },
        htmlUpdater(node,value){
            //console.log(value);
            node.innerHTML = value;
        },
        modelUpdater(node,value){
            console.log(value);
            node.value = value;
        }
    }
}
```

#### 总结

1. dep作为watcher和observer的中间者，在new watcher时，把目前的watcher保存起来，在new watcher时，由于会get值，触发observer拦截，将保存起来的watcher放入dep中
2. 由于每一个节点都需要watcher，所以在对每个节点执行编译时，添加watcher
3. 由于设置的代理只有data，所以只有data中的数据才有响应式
4. 并且只有在节点中使用的数据，才被加入了watcher，没有使用的数据，是不会被加入watcher的。



#### 学习时的疑惑

1. 为什么在Compile时，new  watcher

   因为compile是每一个节点都会经历的步骤

2. 为什么在get时，收集watcher？

   因为初始化时，会进行一次get，因为在第一次编译时，new watcher，只要new watcher就会get数据

3. 在new watcher时，获取数据





***

***End***

***by wind-jyf***

