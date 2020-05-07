# ES6环境搭建

#### 1.在Node.js环境运行ES6

* 安装node
* vscode安装code runner插件

#### 2.webpack

##### 2.1核心概念

* 入口（entry）
* 输出（output）
* loader
* 插件（plugins）

##### 2.2入口（entry）

* 单个入口（简单）语法

```javascript
const config = {
  entry: "./src/main.js"
}
```

* 对象语法

```javascript
const config = {
  app: "./src/main.js",
  vendors: "./src/vendors.js"
}
```

##### 2.3输出（output）

* output会配置打包后相关文件的信息

```javascript
const config = {
  entry: "./src/main.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, 'dist')//__dirname代表当前路径下
  }
}
```

##### 2.4loader

* webpack自身只能理解JS
* loader可以将所有类型的文件转换为webpack可以理解的模块
* 在module中进行配置即可
* 不需要引入，但需要下载

```javascript
module: {
    rules: [
      {
          test: /\.js$/, //正则表达式，匹配相关需要转换的文件
          exclude: /node_modules/,
          loader: "babel-loader",//所用到的loader，有顺序之分，从下到上解读
          options: [
            presets: ["env"]
          ]
      }
    ]
  }
```

##### 2.5插件

* 插件做的事情相比loader更多
* loader被用于转换某些类型的模块
* 插件可以打包优化、压缩、定义环境变量等
* 需要引入，即require以及下载
* 以对象形式添加到plugins数组中

```javascript
plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'})
  ]
```



***

***END***

***by wind-jyf***



