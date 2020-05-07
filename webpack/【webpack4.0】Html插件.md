# Html插件

#### 1.所遇到的问题

* 必须以文件形式打开
* HTML必须放在dist文件夹下



#### 2.以localhost形式打开

* 安装webpack-dev-server

```shell
npm add webpack-dev-server  -D
```

* 在命令行中以webpack-dev-server打开

```shell
npx webpack-dev-server
```

* 也可在package.json中配置脚本

```javascript
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "buid": "webpack --config webpack.config.js",
    "dev": "webpack-dev-server"  
  }
```

**注：经过上面配置后，便可直接使用npm run dev运行**



#### 3.将文件均放入src中，自动添加脚本JS

* 安装html-webpacl-plugin插件

```shell
npm add html-webpack-plugin -D
```

* 在webpack.config.js中进行相关配置

```javascript
let HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    plugins:[//数组  放着webpack所有的插件
        new HtmlWebpackPlugin({
            template:'./src/index.html', //作为模板文件，会向里面自动添加JS脚本
            filename:'index.html',    //生成的文件，但我们看不到
            minify:{		//对文件进行压缩
                removeAttributeQuotes:true , //删除双引号
                collapseWhitespace:true   //折叠空行
            }
        })
    ]
}
```

***

***END***

***by wind-jyf***

