# Vue知识点

## 对SPA单页面的理解，以及其优缺点

> SPA仅在Web页面初始化时加载相应的HTML、JavaScript和CSS。一旦页面加载完成，SPA不会因为用户的操作而进行页面的重新加载或跳转；相反利用的是路由机制实现HTML内容的变换，避免页面的重新加载。

**优点**：

* 用户体验感好，快，内容的改变不需要重新加载整个页面，避免了不必要的跳转和重复渲染
* 基于上面一点，SPA相对对服务器的压力会减小
* 前后端职责分离，架构清晰，前端进行交互逻辑，后端负责数据处理

**缺点**：

* 初次加载耗时多：为实现单页Web应用功能及显示效果，需要在加载页面的时候将JavaScript、CSS统一加载，部分按需加载。
* 前进后退路由管理：由于单页面应用在一个页面中显示所有的内容，所以不能使用浏览器的前进后退功能，所有的页面切换都需要自己建立堆栈管理。
* SEO难度大：由于所有的内容都在一个页面中动态替换显示，所以SEO上有着天然的弱势。

## MVVM和MVC的区别

* **MVC**：一般MVC分为Model（模型），View（视图），Controller（控制器）。主要是基于分层的目的，让彼此的职责分开。View一般通过Controler来和Model联系。Controller是Model和View的协调者，View和Model不直接联系。基本都是单向联系的。

![MVC](https://github.com/lf2021/Front-End-Interview/raw/master/images/MVC.png)

1. View传送指令到Controller。
2. Controller完成业务逻辑后改变Model。
3. Model将新的数据发送至View，用户得到反馈。

* **MVVM**：MVVM是把MVC中的Controller改变成了ViewModel（视图数据层）。View（视图层）的变化会自动更新到ViewModel，ViewModel的变化也会自动同步到View上显示。

![MVVM](https://github.com/lf2021/Front-End-Interview/raw/master/images/MVVM.png)

**MVVM和MVC的区别**：

- MVC中Controller演变成MVVM中的ViewModel
- MVVM通过数据来显示视图层而不是节点操作
- MVVM主要解决了MVC中大量的dom操作使页面渲染性能降低,加载速度变慢,影响用户体验

## v-if和v-show的区别

#### v-if

* 每次都会删除或创建元素来控制DOM节点的存在与否
* 是真正的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建
* 也是惰性的，如果在初始渲染时条件为假，则什么都不做，直到条件第一次为真的时候，才会开始渲染条件块

#### v-show

* 不管初始条件是什么，都会被渲染

* v-show：只是切换了元素的样式 display:none，display:block

适用场景

* v-if有较高的切换性能消耗，v-show有较高的初始渲染消耗
* 频繁操作时，使用v-show，一次性渲染完时，使用v-if

## computed和watch的区别和运用的场景

**computed**：是计算属性，依赖于其他的属性值，并且计算出来的属性也会加入到data中，并且computed的值有缓存，只有它依赖的属性值发生了改变，下一次获取compued的值才会重新计算computed的值。

**watch**：更多的是“观察”的作用，类似于某些数据的监听回调，每当监听的数据变化时都会执行回调继续后续的操作。

**运用场景**：

* 当我们需要进行数值计算，并且依赖于其他数据时，应该使用**computed**，因为可以利用computed的缓存特性，避免每次获取值时，都要重新计算。
* 当一条数据影响多条数据时，例如输入框

## class与style如何动态绑定

两者的绑定均是通过v-bind指令来达到。

#### class

class可以通过对象语法或是数组语法进行动态绑定

* 对象语法

  ```vue
  <div v-bind:class="{active:isActive,'text-danger':hasError}"></div>
  
  data:{
  	isActive:true,
  	hasError:false
  }
  ```

  最终的class会渲染为`class="active"`

* 数组语法

  ```vue
  <div v-bind:class="[isActive?activeClass:'',errorClass]"></div>
  
  data:{
  	activeClass:'active',
  	errorClass:'text-danger'
  }
  ```

  如果isActive为true，则最终的class会渲染为`class="active text-danger"`

#### style

style也可以通过对象语法和数组语法进行动态绑定

* 对象语法

  ```vue
  <div v-bind:style="{color:activeColor,fontSize:fontSize}"></div>
  data:{
  	activeColor:'red',
  	fontSize:30
  }
  ```

* 数组语法

  ```vue
  <div v-bind:style="[styleColor,styleSize]"></div>
  data:{
  	styleColor:{
  		color:"red"
  	},
  	styleSize:{
  		fontSize:'23px'
  	}
  }
  ```

  

## 为什么Vue组件中的data必须是函数

> 当一个组件被定义的时候，data必须返回一个声明初始化数据对象的函数。

* 因为组件可能被用来创建多个实例对象。
* 如果data是一个纯粹的对象，则所有的实例将共享引用同一个数据对象。
* 通过data函数，每次创建一个新的实例，调用data函数，从而返回数据的一个全新副本数据对象。

## Vue的生命周期



* beforCreate：
  * 在new一个Vue实例后，只有一些默认的生命周期钩子和默认事件，其他的东西都还没创建。
  * 在实例初始化之后，数据观测（data observer）和event/watcher事件配置之前被调用。
  * data和methods中的数据还没有初始化，不能在这个阶段使用data中的数据和methods中的方法。
* created：
  * 在这一步，实例已经完成以下的配置：数据观测，property和方法的运算，watch/event事件回调。然而，挂载阶段还没开始，$el property目前尚不可用。
  * data和methods都已经初始化好了，如果要调用methods中的方法，或者操作data中的数据，最早可以在这个阶段中操作。
* beforeMounted：
  * 在挂载dom之前调用，相关的render函数首次被调用。
  * 执行到这个钩子的时候，在内存中已经编译好了模板，但是还未挂载到页面中，此时页面还是旧的。
* mounted：
  * 此时组件已经脱离的创建阶段，进入到了运行阶段。
  * 在这个时候，我们可以来操作DOM了
* beforeUpdated：
  * 当执行这个钩子时，页面中的显示的数据还是旧的，data中的数据是更新后的，但页面还没有和最新的数据保持同步
* updated：
  * 页面中显示的数据和data中的数据已经保持同步了，都是最新的
* beforeDestroy：
  * Vue实例从运行阶段进入到了销毁阶段，这个时候所有的data和methods，指令，过滤器等等都是处于可用状态，还没有被真正销毁
* destroyed：
  * 这个时候所有的data和methods，指令，过滤器都是处于不可用的阶段，组件已经被销毁了。
* activated：
  * 被`keep-alive`缓存的组件激活时调用
* deactivated：
  * 被`keep-alive`缓存的组件停用时调用

## keep-alive

keep-alive是Vue内置的一个组件，可以使被包含的组件保留状态，避免重新渲染，其有以下特性：

* 一般结合路由和动态组件一起使用，用于缓存组件；
* 提供 include 和 exclude 属性，两者都支持字符串或正则表达式， include 表示只有名称匹配的组件会被缓存，exclude 表示任何名称匹配的组件都不会被缓存 ，其中 exclude 的优先级比 include 高；
* 对应两个钩子函数 activated 和 deactivated ，当组件被激活时，触发钩子函数 activated，当组件被移除时，触发钩子函数 deactivated。

## Vue中父子组件生命周期执行顺序

在单一组件中，钩子的执行顺序是beforeCreate-> created -> mounted->... ->destroyed

父子组件生命周期执行顺序：

- 加载渲染过程

  ```
  父beforeCreate->父created->父beforeMount->子beforeCreate->子created->子beforeMount->子mounted->父mounted
  ```

- 更新过程

  ```
  父beforeUpdate->子beforeUpdate->子updated->父updated
  ```

- 销毁过程

  ```
  父beforeDestroy->子beforeDestroy->子destroyed->父destroyed
  ```

- 常用钩子简易版

  ```
  父create->子created->子mounted->父mounted
  ```

## nextTick用法

将回调延迟到下次DOM更新循环之后执行。在修改数据后立即使用它，然后等待DOM更新。

## Vue中的key

key 是为 Vue 中 vnode 的唯一标记，通过这个 key，我们的 diff 操作可以更准确、更快速。Vue 的 diff 过程可以概括为：oldCh 和 newCh 各有两个头尾的变量 oldStartIndex、oldEndIndex 和 newStartIndex、newEndIndex，它们会新节点和旧节点会进行两两对比，即一共有4种比较方式：newStartIndex 和oldStartIndex 、newEndIndex 和  oldEndIndex 、newStartIndex 和 oldEndIndex 、newEndIndex 和 oldStartIndex，如果以上 4 种比较都没匹配，如果设置了key，就会用 key 再进行比较，在比较的过程中，遍历会往中间靠，一旦 StartIdx > EndIdx 表明 oldCh 和 newCh 至少有一个已经遍历完了，就会结束比较。

## Vue的路由模式

* hash模式
  * 在hash模式里，比较显著的是会有一个#号
  * 可以使用location.hash来获取#后面的内容
  * hash虽然在URL中，但不会被包括在HTTP，因为我们hash每次页面切换其实切换的是#之后的内容，而#之后的内容改变并不会触发地址的改变，所以不会向后台发出请求，因此改变hash不会重新加载页面
  * 每次hash改变都会触发onhashchange事件
  * 可以随意刷新
* history模式
  * 利用了 HTML5 History Interface 中新增的 pushState() 和 replaceState() 方法。（需要特定浏览器支持）
  * 可以使用popState来监听url的变化，从而对页面进行跳转（渲染）
  * history.pushState()和replaceState()不会触发popState事件，因为这是我们手动触发页面跳转（渲染）
  * 在当前已有的 back、forward、go的基础之上，它们提供了对历史记录进行修改的功能。只是当它们执行修改时，虽然改变了当前的URL，但浏览器不会立即向后端发送请求。
  * 由于history模式下是可以自由修改请求url，当刷新时如果不对对应地址进行匹配就会返回404。
  * 不能刷新
* abstract
  * 支持所有JavaScript运行环境，如Node.js服务器端。如果发现没有浏览器的API，路由会自动强制进入这个模式。

## Vue中$router和$route的区别

* this.$route：当前激活的路由的信息对象。每个对象都是局部的，可以获取当前路由的path，name，params，query等属性。
* this.$router：全局的router实例。通过Vue根实例中注入router实例，然后再注入到每个子组件，从而让整个应用都有路由功能。其中包含了很多属性和对象（比如history对象），任何页面也都可以调用push(),replace(),go()等方法。

## 如何理解Vue的单向数据流

>  在父子组件通信中，可以使用prop来进行。

但是所有的prop都使得其父子prop之间形成了一个**单向下行绑定**：父级prop的更新会向下流动到子组件中，但是反过来则不行，这样是为了防止子组件意外改变父组件的状态。

每次在父组件更新的时候，其子组件的所有prop都会自动刷新为最新的值。这意味着不应该在一个子组件内部改变prop。如果这样做了，浏览器的控制台中会发出警告。如果子组件想要修改，只能通过$emit派发一个自定义事件，父组件收到后，由父组件修改。

有两种常见的试图改变一个 prop 的情形 :

- **这个 prop 用来传递一个初始值；这个子组件接下来希望将其作为一个本地的 prop 数据来使用。** 在这种情况下，最好定义一个本地的 data 属性并将这个 prop 用作其初始值：

```vue
props: ['initialCounter'],
data: function () {
  return {
    counter: this.initialCounter
  }
}
```

- **这个 prop 以一种原始的值传入且需要进行转换。** 在这种情况下，最好使用这个 prop 的值来定义一个计算属性

```vue
props: ['size'],
computed: {
  normalizedSize: function () {
    return this.size.trim().toLowerCase()
  }
}
```

## 如何检测数组的变化

由于一些限制，Vue不能检测到以下数组操作的变动：

* 使用索引设置一个数组项时
* 当想要修改数组的长度时

Vue提供了如下方法来解决：

* Vue.set()
* vm.$set();即this.$set
* vm.item.split()

## 在哪个生命周期内调用异步请求

可以在钩子函数 created、beforeMount、mounted 中进行调用，因为在这三个钩子函数中，data 已经创建，可以将服务端端返回的数据进行赋值。但是本人推荐在 created 钩子函数中调用异步请求，因为在 created 钩子函数中调用异步请求有以下优点：

- 能更快获取到服务端数据，减少页面 loading 时间；
- ssr 不支持 beforeMount 、mounted 钩子函数，所以放在 created 中有助于一致性；

## 父组件中监听子组件的生命周期

比如有父组件 Parent 和子组件 Child，如果父组件监听到子组件挂载 mounted 就做一些逻辑处理，可以通过以下写法实现：

```
// Parent.vue
<Child @mounted="doSomething"/>
    
// Child.vue
mounted() {
  this.$emit("mounted");
}
复制代码
```

以上需要手动通过 $emit 触发父组件的事件，更简单的方式可以在父组件引用子组件时通过 @hook 来监听即可，如下所示：

```
//  Parent.vue
<Child @hook:mounted="doSomething" ></Child>

doSomething() {
   console.log('父组件监听到 mounted 钩子函数 ...');
},
    
//  Child.vue
mounted(){
   console.log('子组件触发 mounted 钩子函数 ...');
},    
    
// 以上输出顺序为：
// 子组件触发 mounted 钩子函数 ...
// 父组件监听到 mounted 钩子函数 ...     
复制代码
```

当然 @hook 方法不仅仅是可以监听 mounted，其它的生命周期事件，例如：created，updated 等都可以监听。

## Vue组件的通信方式

1. `prop/$emit`

2. `ref`与`$parent/$children`

   * `ref`：如果在普通的DOM元素上使用，引用指向的是DOM元素，如果用在子组件上，引用的就是组件实例
   * `$parent/$children`：访问父/子实例

3. `EventBus($emit/$on)`

   这种方法通过一个空的 Vue 实例作为中央事件总线（事件中心），用它来触发事件和监听事件，从而实现任何组件间的通信，包括父子、隔代、兄弟组件。

4. `$attrs`/`$listeners`

   `$attrs`：包含了父作用域中不被 prop 所识别 (且获取) 的特性绑定 ( class 和 style 除外 )。当一个组件没有声明任何 prop 时，这里会包含所有父作用域的绑定 ( class 和 style 除外 )，并且可以通过 `v-bind="$attrs"` 传入内部组件。通常配合 inheritAttrs 选项一起使用。

   `$listeners`：包含了父作用域中的 (不含 .native 修饰器的)  v-on 事件监听器。它可以通过 `v-on="$listeners"` 传入内部组件

5. `provide / inject`

   祖先组件中通过 provider 来提供变量，然后在子孙组件中通过 inject 来注入变量。 provide / inject API 主要解决了跨级组件间的通信问题，不过它的使用场景，主要是子组件获取上级组件的状态，跨级组件间建立了一种主动提供与依赖注入的关系。

6. Vuex

   Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。每一个 Vuex 应用的核心就是 store（仓库）。“store” 基本上就是一个容器，它包含着你的应用中大部分的状态 ( state )。

   - Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
   - 改变 store 中的状态的唯一途径就是显式地提交  (commit) mutation。这样使得我们可以方便地跟踪每一个状态的变化。

## Vuex

Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。每一个 Vuex 应用的核心就是 store（仓库）。“store” 基本上就是一个容器，它包含着你的应用中大部分的状态 ( state )。

- Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
- 改变 store 中的状态的唯一途径就是显式地提交  (commit) mutation。这样使得我们可以方便地跟踪每一个状态的变化。

主要包括以下几个模块：

* State：定义了应用状态的数据结构，可以在这里设置默认的初始状态
* Getter：允许组件从Store中获取数据，mapGetters辅助函数仅仅是将store中的getter映射到局部计算属性
* Mutation：是唯一更改store中状态的方法，且必须是同步函数
* Action：用于提交mutation，而不是直接改更状态，可以包含任意异步操作
* Module：允许将单一的store拆分为多个store且同时保存在单一的状态树中。

## 如何实现双向绑定

实现一个监听器 Observer：对数据对象进行遍历，包括子属性对象的属性，利用 Object.defineProperty() 对属性都加上 setter 和 getter。这样的话，给这个对象的某个值赋值，就会触发 setter，那么就能监听到了数据变化。

实现一个解析器 Compile：解析 Vue 模板指令，将模板中的变量都替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，调用更新函数进行数据更新。

实现一个订阅者 Watcher：Watcher 订阅者是 Observer 和 Compile 之间通信的桥梁 ，主要的任务是订阅 Observer 中的属性值变化的消息，当收到属性值变化的消息时，触发解析器 Compile 中对应的更新函数。

实现一个订阅器 Dep：订阅器采用 发布-订阅 设计模式，用来收集订阅者 Watcher，对监听器 Observer 和 订阅者 Watcher 进行统一管理。

## Proxy与Object.defineProperty优劣对比

**Proxy 的优势如下:**

- Proxy 可以直接监听对象而非属性；
- Proxy 可以直接监听数组的变化；
- Proxy 有多达 13 种拦截方法,不限于 apply、ownKeys、deleteProperty、has 等等是 Object.defineProperty 不具备的；
- Proxy 返回的是一个新对象,我们可以只操作新的对象达到目的,而 Object.defineProperty 只能遍历对象属性直接修改；
- Proxy 作为新标准将受到浏览器厂商重点持续的性能优化，也就是传说中的新标准的性能红利；

**Object.defineProperty 的优势如下:**

- 兼容性好，支持 IE9，而 Proxy 的存在浏览器兼容性问题,而且无法用 polyfill 磨平，因此 Vue 的作者才声明需要等到下个大版本( 3.0 )才能用 Proxy 重写。

## vm.$set实现原理

```javascript
export function set (target: Array<any> | Object, key: any, val: any): any {
  // target 为数组  
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    // 修改数组的长度, 避免索引>数组长度导致splcie()执行有误
    target.length = Math.max(target.length, key)
    // 利用数组的splice变异方法触发响应式  
    target.splice(key, 1, val)
    return val
  }
  // key 已经存在，直接修改属性值  
  if (key in target && !(key in Object.prototype)) {
    target[key] = val
    return val
  }
  const ob = (target: any).__ob__
  // target 本身就不是响应式数据, 直接赋值
  if (!ob) {
    target[key] = val
    return val
  }
  // 对属性进行响应式处理
  defineReactive(ob.value, key, val)
  ob.dep.notify()
  return val
}
```

vm.$set 的实现原理是：

- 如果目标是数组，直接使用数组的 splice 方法触发相应式；
- 如果目标是对象，会先判读属性是否存在、对象是否是响应式，最终如果要对属性进行响应式处理，则是通过调用   defineReactive 方法进行响应式处理（ defineReactive 方法就是  Vue 在初始化对象时，给对象属性采用 Object.defineProperty 动态添加 getter 和 setter 的功能所调用的方法）

## 虚拟DOM的优缺点

**优点：**

- **保证性能下限：** 框架的虚拟 DOM 需要适配任何上层 API 可能产生的操作，它的一些 DOM 操作的实现必须是普适的，所以它的性能并不是最优的；但是比起粗暴的 DOM 操作性能要好很多，因此框架的虚拟 DOM 至少可以保证在你不需要手动优化的情况下，依然可以提供还不错的性能，即保证性能的下限；
- **无需手动操作 DOM：** 我们不再需要手动去操作 DOM，只需要写好 View-Model 的代码逻辑，框架会根据虚拟 DOM 和 数据双向绑定，帮我们以可预期的方式更新视图，极大提高我们的开发效率；
- **跨平台：** 虚拟 DOM 本质上是 JavaScript 对象,而 DOM 与平台强相关，相比之下虚拟 DOM 可以进行更方便地跨平台操作，例如服务器渲染、weex 开发等等。

**缺点:**

- **无法进行极致优化：** 虽然虚拟 DOM + 合理的优化，足以应对绝大部分应用的性能需求，但在一些性能要求极高的应用中虚拟 DOM 无法进行针对性的极致优化。

## 虚拟DOM实现原理

虚拟DOM的实现原理主要包括以下3部分：

* 用JavaScript对象模拟真实的DOM树，对真实DOM抽象
* diff算法比较两棵虚拟DOM树的差异
* patch算法将两个虚拟DOM对象的差异应用到真正的DOM树上。

