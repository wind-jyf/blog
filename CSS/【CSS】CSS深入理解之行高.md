# CSS深入理解之行高

#### 一、字面意思

“行高”从字面意思理解就是指一行文字的高度，更加形象的来说，就是两行文字间基线之间的距离。

下面这两条线之间的高度便称为行高

***

***

#### 二、line-height与line boxes

几个问题：

* 当我们在没有给div设置高度时，当里面有字体时，这个高度是谁撑起来的
* 这个高度是因为文字被撑起来的吗
* 如果字体大小设为0，但却设置line-height，会发生什么事情
* 以及设置字体大小为20px，但line-height为0，又会发生什么

看下面这段代码

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Document</title>
	<style>
		.test1{
			margin-top: 60px;
			font-size:20px; 
			line-height:0; 
			border:1px solid #cccccc;
			background:#eeeeee;
			}
		.test2{
			margin-top: 60px;
			font-size:0;
			line-height:20px;
			border:1px solid #cccccc;
			background:#eeeeee;
			}
	</style>
</head>
<body>
	<div class="test1">测试</div>
	<div class="test2">测试</div>
</body>
</html>
```

效果图

![img](file:///D:\2367770337\Image\C2C\MTDC6~8S84BKBMB3%FWNY@T.png)

**三、从这张图我们可以看出来，真正使div撑起了的不是文字，而是lin-height**

1. 在`inline box`模型中，有个`line boxs`，它的作用就是去包裹每行文字
2. 一行文字就会产生一个line boxs
3. line-boxs又会考察当下谁的实际line-height值最高，它就要谁的值，形成高度

#### 四、行高的垂直居中性

 `line-height`的最终表现是通过`line boxes`实现的，而无论`line boxes`所占据的高度是多少（无论比文字大还是比文字小），其占据的空间都是与文字内容公用水平中垂线的 。

从上图的test1结果就可以看出，它是以文字的水平中垂线对称分布的，用这一特性可以实现文字或图片的垂直居中。



#### 五、设置垂直居中

> 以前总是说，将height和line-height的值设置为一样的值之后，就会实现垂直居中，但其实height完全可以忽略

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Document</title>
	<style>
		
		.test2{
			font-size:10px;
			line-height:40px;
			height: 40px;
			border:1px solid #cccccc;
			background:#eeeeee;
			}
	</style>
</head>
<body>
	<div class="test2">测试</div>
</body>
</html>
```

效果图：

<img src="file:///D:\2367770337\Image\C2C\V{BX{3N`8LHDWN[3[P1]2$9.png" alt="img" style="zoom:60%;" />

* 但是将height去掉，完全是相同的效果，因为line boxes的高度取决于它下面成员的最高高度
* 但是height和line-height不一致时，由于背景色是根据height来设定的，所以当height相较于line-height大或小时，看到的背景色便会多出或少出，所以效果也便不再居中。

**将height设置为30px后**

![6](C:\Users\随风\Desktop\blog\images\6.png)

参考文章：

* [css行高line-height的一些深入理解及应用]( [https://www.zhangxinxu.com/wordpress/2009/11/css%E8%A1%8C%E9%AB%98line-height%E7%9A%84%E4%B8%80%E4%BA%9B%E6%B7%B1%E5%85%A5%E7%90%86%E8%A7%A3%E5%8F%8A%E5%BA%94%E7%94%A8/](https://www.zhangxinxu.com/wordpress/2009/11/css行高line-height的一些深入理解及应用/) )

***

***End***

***by wind-jyf***

