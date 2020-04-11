# 学习Vue源码第一天

#### 入口

src/core/instance/index.js

声明了Vue对象

```javascript
function Vue (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword')
  }
  this._init(options)
}
```

1. 首先，传入option参数
2. 如果没有使用new进行创建对象的话，就会报错
3. 正确创建对象后，执行this._init(options)，此方法是vue原型上的方法

#### this._init(options)

src/core/instance/core.js

```javascript
Vue.prototype._init = function (options?: Object) {
    const vm: Component = this
    // a uid
    vm._uid = uid++

    let startTag, endTag
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      startTag = `vue-perf-start:${vm._uid}`
      endTag = `vue-perf-end:${vm._uid}`
      mark(startTag)
    }

    // a flag to avoid this being observed
    vm._isVue = true
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options)
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      )
    }
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm)
    } else {
      vm._renderProxy = vm
    }
    // expose real self
    vm._self = vm
    initLifecycle(vm)
    initEvents(vm)
    initRender(vm)
    callHook(vm, 'beforeCreate')
    initInjections(vm) // resolve injections before data/props
    initState(vm)
    initProvide(vm) // resolve provide after data/props
    callHook(vm, 'created')

    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
      vm._name = formatComponentName(vm, false)
      mark(endTag)
      measure(`vue ${vm._name} init`, startTag, endTag)
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el)
    }
  }
```

1. 首先判断传入的参数是不是对象
2. 再去执行一系列的初始化
3. 最后判断是否传入了el，如果传入了，就去挂载el，挂载的目的就是把模板渲染成最终的DOM

#### Vue实例挂载

src/platforms/web/entry-runtime-with-compiler

```javascript
const mount = Vue.prototype.$mount  //先将之前原型上的mount保存起来，方便复用
Vue.prototype.$mount = function (  //定义新的mount
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && query(el)  //获得dom

  /* istanbul ignore if */
  if (el === document.body || el === document.documentElement) {   //判断是否挂载到body或者是标签下了
    process.env.NODE_ENV !== 'production' && warn(
      `Do not mount Vue to <html> or <body> - mount to normal elements instead.`
    )
    return this
  }

  const options = this.$options    //获得参数
  // resolve template/el and convert to render function
  if (!options.render) {    //如果没有render函数
    let template = options.template
    if (template) {   //如果有模板
      if (typeof template === 'string') {
        if (template.charAt(0) === '#') {
          template = idToTemplate(template)       //会转化为render
          /* istanbul ignore if */
          if (process.env.NODE_ENV !== 'production' && !template) {
            warn(
              `Template element not found or is empty: ${options.template}`,
              this
            )
          }
        }
      } else if (template.nodeType) {
        template = template.innerHTML
      } else {
        if (process.env.NODE_ENV !== 'production') {
          warn('invalid template option:' + template, this)
        }
        return this
      }
    } else if (el) {   //没有模板
      template = getOuterHTML(el)
    }
    if (template) {
      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile')
      }

      const { render, staticRenderFns } = compileToFunctions(template, {
        outputSourceRange: process.env.NODE_ENV !== 'production',
        shouldDecodeNewlines,
        shouldDecodeNewlinesForHref,
        delimiters: options.delimiters,
        comments: options.comments
      }, this)
      options.render = render
      options.staticRenderFns = staticRenderFns

      /* istanbul ignore if */
      if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
        mark('compile end')
        measure(`vue ${this._name} compile`, 'compile', 'compile end')
      }
    }
  }
  return mount.call(this, el, hydrating)  //因为已经转化为带render的了，此时进行方法的复用
}
```

1. 此mount方法是采用了runtime+compile
2. 首先将之前的原型mount方法保存起来，方便复用
3. 再判断是否有render函数，以及template，会将其转化为render函数，如果不符合相关写法，会报一些错误
4. 、最后再讲转化好的模板用最开始的mount函数调用

##### 原来原型方法的mount函数

```javascript
Vue.prototype.$mount = function (
  el?: string | Element,
  hydrating?: boolean
): Component {
  el = el && inBrowser ? query(el) : undefined
  return mountComponent(this, el, hydrating)  //这里会调用mountComponent方法
}
```

1. 其实就是最后会调用mountComponent方法来进行挂载



#### mountComponent

1. 首先进行相关判断，如果render错误，会报一些相关错误
2. 再去执行update以及render

#### render



