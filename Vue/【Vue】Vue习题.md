# Vue习题

#### 1.子组件为何不可以修改父组件传递的prop，如果修改了，Vue是如何监控到属性的修改并给出警告的？

下面来看一个例子

* 子组件是一个input输入框
* 子组件的value由父组件传值过去
* 添加了子组件修改父组件传递过来的值，此时会报错

子组件代码

```vue
<template>
  <div class="hello">
    <input type="text" :value="msg" @change="change">
  </div>
</template>

<script>
export default {
  name:'HelloWorld',
  props:{
    msg:String
  },
  methods:{
    change(){
      this.msg  = 'ok';   //此时在子组件中修改了父组件
    }
  }
}
</script>
```

那么为什么会报错呢？

* vue是单向数据流，数据的流动方向是自上往下的
* 即使vue是双向绑定，但是双向绑定也不过是一个语法糖，因为最终修改也是对数据进行了一个代理拦截，数据驱动视图，视图的变化先驱动了数据再驱动了视图

那么如果修改了，vue它是如何监控到的呢？

* 首先，vue只允许父组件修改prop，所以，以此为突破点，设置一个flag
* 只有父组件修改prop时，flag才会置为true，其他时候，都会是false
* 只要修改了prop，且flag为false，此时就会报错

```vue
<template>
  <div class="hello">
    <input type="text" :value="msg" >
    <button @click="change">按钮</button>
  </div>
</template>

<script>
export default {
  name:'HelloWorld',
  props:{
    msg:String
  },
  methods:{
    change(){
      const value = this.$emit('home','我是子组件');
      console.log(value);//通过结果可得知是this
    }
  }
}
</script>
```

所以，返回值为this

#### 3.为什么不能用index作为key

首先要了解一下diff算法

在vue中，diff不关注组件内部是如何实现的，它只会看模板上声明的传递给组件的一些属性是否更新

例如，现在有一个列表1,2,3，想要删除第一个，于是vue会进行比对节点上的属性，来决定是否复用

vue会发现删除后的第一个节点1：直接复用，节点2：直接复用，把多出来的第三个删除

所以，使用index会把整个列表的顺序打乱，而且在一些可以复用情况下会进行重新渲染，导致性能低

#### 4.数组有哪些支持响应式更新，底层原理是如何实现的

以下方法支持响应式：

* push()
* pop()
* shift()
* unshift()
* splice()
* sort()
* reverse()

实现方式：

1. 将以上方法进行包裹加入侦听
2. 对数组方法进行改写，相当于对数组做了一层代理

#### 5.Vuex是如何进行数据的响应式

```javascript
constructor(){
	this._vm = new Vue({
		data:{
			$$state:this.state; //将数据加入Vue实例，进行响应式
		}
	})
}
```

其实就是进行new vue，然后将state加入响应式。



对于vue还有太多不懂的地方，继续学习

---

***End***

***by wind-jyf***

