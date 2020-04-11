# webpack4.0简介

#### 1.可以做的事情

* 代码转换
* 文件优化
* 代码分割
* 模块合并
* 自动刷新
* 代码校验
* 自动发布

#### 2.需要提前掌握的内容

* node基础、以及npm使用
* es6语法

#### 3.webpack安装

*  webpack webpack-cli -D

```shell
npm init -y
```

**注：-y表示yes的意思，在init的时候省去了敲回车的步骤，生成的默认的package.json**

```shell
npm add webpack webpack-cli -D
```

**注：-D表示当前是开发依赖，上线的时候不需要**

#### 4.webpack可以进行0配置

* 打包工具->输出后的结果（js模块）
* 打包（支持我们的js模块化）

#### 5.手动配置webpack

* 默认配置文件的名字 webpack.config.js
* 也可在运行时手动指定配置文件    npx webpack --config webpack.config.js
* 配置脚本(在package.json)

```javascript
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "buid":"webpack --config webpack.config.js"
  }
```



* webpack.config.js文件中的内容，此时配置很弱，只能打包JS文件

```javascript
//webpack是node写出来的 所以要使用node的写法

let path = require('path');  //内置模块，不需要安装，直接引用即可
module.exports = {
    mode:'development',//模式 默认有两种  production  development
    entry:'./src/index.js',  //入口 
    output:{
       filename:'bundle.js' ,//打包后的文件名
       path:path.resolve(__dirname,'dist'),//路径必须是一个绝对路径，resove可以将相对路径解析为为绝对路径
        //__dirname意思是以当前目录新建文件夹dist
    }
}

```

* 为什么文件名一定要叫webpack.config.js？

  * node_module下默认运行webpack
  * webpack 默认下会调用webpack-cli
  * cli里会有解析参数的对象 config-yargs.js文件

  ```javascript
  config: {
  				type: "string",
  				describe: "Path to the config file",
  				group: CONFIG_GROUP,
  				defaultDescription: "webpack.config.js or webpackfile.js",
  				requiresArg: true
  			}
  ```

  

#### 6.大致了解打包后的文件

* 整体其实就是一个匿名函数

```javascript
({
 "./src/index.js": //key->模块的路径
 (function(module, exports) {  //value函数

eval("console.log(\"hello word\")\n\n//# sourceURL=webpack:///./src/index.js?");
})

 });

//然后将这一对象传给modules
```



***

***End***

***by wind-jyf***





cnpm i babel-core babel-loader babel-plugin-transform-runtime -D

cnpm i babel-preset-env babel-preset-stage-0 babel-preset-react -D