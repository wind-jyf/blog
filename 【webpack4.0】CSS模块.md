# CSS模块

#### 1.前期准备

* 安装相关的loader
* 不需要进行引入

```shell
npm add css-loader style-loader -D
```

* 在webpack.config.js进行配置

```javascript
module:{//模块
                rules:[ //规则  css-loader 解析 @import这种语法
                    //style-loader 是把css插入到head标签中
                    //loader的特点，功能单一
                    //多个loader需要数组
                    //loader的顺序，默认是从右向左进行
                    //loader还可以写成对象形式，可以多传点参数
                    { test:/\.css$/ , use: ['style-loader', 'css-loader' ]}
                ]
            }
```

#### 2.相关插件

* css-loader
* style-loader

**注：loader的特点是功能单一，所有有时需要引入多个loader，这时便需要使用数组**

#### 3.其他插件

* mini-css-extract-plugin -D

```shell
npm add mini-css-extract-plugin -D
```

##### 3.1作用

* 抽离css

##### 3.2引入

```javascript
let MiniCssExtractPlugin = require('mini-css-extract-plugin')
```

##### 3.3配置

在放入plugin中new一个新对象

```javascript
plugins:[//数组  放着webpack所有的插件
        new HtmlWebpackPlugin({
            template:'./src/index.html',
            filename:'index.html',
            minify:{
                removeAttributeQuotes:true , //删除双引号
                collapseWhitespace:true , //折叠空行
            },
            hash:true
        }),
        new MiniCssExtractPlugin({
            filename:'main.css'
     })
    ]
```

**注：因为此对象中有一个自带loader，将css-loader改为MiniCssExtractPlugin.loader即可**

***

***End***

***by wind-jyf***

