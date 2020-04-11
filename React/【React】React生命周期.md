# React生命周期

* 创建
* 运行
* 销毁

#### 创建

* static defautProps = {}
  * 这是初始化props属性默认值的，作用是防止组件中某些必须的属性，外界没有传递的时候报错问题
* this.state = {}
  * 用来初始化组件的私有数据的
* componentWillMount()
  * 这个函数是组件的虚拟DOM元素，将要挂载到页面上时执行，此时虚拟DOM还未被创建，也没有被挂载。因为虚拟DOM是在render函数中创建的
* render()
  * 当进入到render函数执行的时候，就已经要开始渲染虚拟DOM了，当render执行完，虚拟DOM也就在内存中创建好了，但此时，虚拟DOM并没有挂载到真正的页面上
* componentDidMount()
  * 表示组件已经完成了挂载，此时state上的数据，以及内存中的虚拟DOM，以及浏览器页面，已经保存一致，创建时期的生命周期已经执行完毕



#### 运行

* componentWillReceiveProps(nextProps)
  * 通过属性改变进行触发，
* shouldComponentUpdate(nextProps,nextState)
  * 组件修改或属性修改触发
* componentWillUpdate(nextProps,nextState)
  * 组件将要更新，但还没有更新
* render()
  * 重新渲染内存中的虚拟DOM对象
* componentDidUpdate(prevProps,prevState)
  * 组件已经完成了更新，此时页面也是最新的



#### 销毁

* componentWillUnmount()
  * 此时组件尚可使用，还没有开始卸载

