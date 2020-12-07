# CSS知识点

## CSS盒模型

CSS盒模型分为**标准盒模型**以及**IE盒模型**。

标准盒模型：宽度=内容的宽度（content）+ border + padding+margin

IE盒模型：宽度=内容宽度（content+border+padding）+ margin

我们可以通过`box-sizing`属性来设置盒子模型的解析模式。默认值为content-box。

context-box：W3C的标准盒子模型，设置元素的 height/width 属性指的是content部分的高/宽。
border-box：IE传统盒子模型。设置元素的height/width属性指的是border + padding + content部分的高/宽。

## CSS选择器

* id选择器（#）
* 类选择器（.）
* 标签选择器（div）
* 相邻选择器（h1+p）
* 子选择器（ul>li）
* 后代选择器（li a）
* 通配符选择器（*）
* 属性选择器（a[rel = "external"]）
* 伪类选择器（a:hover）

可继承的属性：font-size, font-family, color

不可继承的样式：border, padding, margin, width, height

优先级（就近原则）：!important > [ id > class > tag ]
!important 比内联优先级高

## CSS选择器的优先级 

###### 一般css选择器的优先级为：

> 内联样式 > ID选择器 > 类选择器 > 标签选择器 

但实际上优先级由四个值决定，我们可以将它们假设为A,B,C,D

###### 规则如下：

1.  如果存在内联样式，那么 `A = 1`, 否则 `A = 0`; 
2.  `B` 的值等于 `ID选择器` 出现的次数; 
3.  `C` 的值等于 `类选择器` 和 `属性选择器` 和 `伪类` 出现的总次数; 
4.  `D` 的值等于 `标签选择器` 和 `伪元素` 出现的总次数 

###### 比较规则：

​	**从A到D依次比较，较大者胜出，不再进行后续比较**

###### 举例

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <style>
        #list .item{
            color: red;
        }
        .list .item{
            color: green;
        }
    </style>
</head>
<body>
    <div class="list" id="list">
        <div class="item">
            item
        </div>
    </div>
</body>
</html>
```

`#list .item`对应的A,B,C,D对应的值为(0,1,1,0)

`.list .item`对应的A,B,C,D对应的值为(0,0,2,0)

从A到B依次进行比较，发现``#list .item``的B更大，所以最后为红色

## CSS3特性

* 新增了许多伪类
  * p:first-of-type  选择属于其父元素的首个元素
  * p:last-of-type 选择属于其父元素的最后元素
  * p:only-of-type 选择属于其父元素唯一的元素
  * p:only-child 选择属于其父元素的唯一子元素
  * p:nth-child(2) 选择属于其父元素的第二个子元素
  * :enabled :disabled 表单控件的禁用状态。
  * :checked 单选框或复选框被选中。
* RGBA和透明度
* background-image background-origin(content-box/padding-box/border-box) background-size background-repeat
* word-wrap（对长的不可分割单词换行）word-wrap：break-word
* 文字阴影：text-shadow： 5px 5px 5px #FF0000;（水平阴影，垂直阴影，模糊距离，阴影颜色）
* font-face属性：定义自己的字体
* 圆角（边框半径）：border-radius 属性用于创建圆角
* 边框图片：border-image: url(border.png) 30 30 round
* 盒阴影：box-shadow: 10px 10px 5px #888888
* 媒体查询：定义两套css，当浏览器的尺寸变化时会采用不同的属性

## 布局

#### 一、水平居中

（1）文本/行内元素/行内块级元素

`text-align`只控制行内内容（文字、行内元素、行内块级元素）如何相对于它的块级父元素居中

```css
text-align:center
```

（2）单个块级元素

```css
width:100px;
margin:0 auto;
```

（3）使用绝对定位实现

```css
#parent{
    height: 200px;
    width: 200px;  /*定宽*/
    position: relative;  /*父相*/
    background-color: #f00;
}
#son{
    position: absolute;  /*子绝*/
    left: 50%;  /*父元素宽度一半,这里等同于left:100px*/
    transform: translateX(-50%);  /*自身宽度一半,等同于margin-left: -50px;*/
    width: 100px;  /*定宽*/
    height: 100px;
    background-color: #00ff00;
}
```

（4）任意个元素（flex）

```css
display:flex;
justice-content:center;
```

#### 二、垂直居中

（1）单行文本/行内元素/行内块级元素

```css
height:150px;
line-height:150px;
```

（2）图片

```css
#parent{
    height: 150px;
    line-height: 150px;
    font-size: 0;
}
img#son{vertical-align: middle;} /*默认是基线对齐，改为middle*/
```

将line-height和verti-align配合使用达到效果

（3）单个块级元素

```css
#parent{
    height: 150px;
    position: relative;  /*父相*/
}
#son{
    position: absolute;  /*子绝*/
    top: 50%;  /*父元素高度一半,这里等同于top:75px;*/
    transform: translateY(-50%);  /*自身高度一半,这里等同于margin-top:-25px;*/
    height: 50px;
}
```

（4）任意个元素（flex）

```css
#parent{
    display: flex;
    align-items: center;
}

或

#parent{
    display: flex;
}
.son{
    align-self: center;
}

或 

#parent{
    display: flex;
    flex-direction: column;
    justify-content: center;
}

```

#### 水平垂直居中

（1）行内/行内块级/图片

```css
#parent{
    height: 150px;
    line-height: 150px;  /*行高的值与height相等*/
    text-align: center;
    font-size: 0;   /*消除幽灵空白节点的bug*/
}
#son{
    /*display: inline-block;*/  /*如果是块级元素需改为行内或行内块级才生效*/
    vertical-align: middle;
}
```

（2）绝对定位

```css
#parent{
    position: relative;
}
#son{
    position: absolute;
    top: 50%;
    left: 50%;
    /*定宽高时等同于margin-left:负自身宽度一半;margin-top:负自身高度一半;*/
    transform: translate(-50%,-50%); 
}
```

（3）绝对居中

原理：当top、bottom为0时,margin-top&bottom设置auto的话会无限延伸占满空间并且平分；当left、right为0时,margin-left&right设置auto的话会无限延伸占满空间并且平分

```css
#parent{
    position: relative;
}
#son{
    position: absolute;
    margin: auto;
    width: 100px;
    height: 50px;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}
```

（4）flex

```css
#parent{
    display: flex;
}
#son{
    margin: auto;
}

或

#parent{
    display: flex;
    justify-content: center;
    align-items: center;
}

或

#parent{
    display: flex;
    justify-content: center;
}
#son{
    align-self: center;
}

```

（5）视窗居中

原理：vh为视口单位，视口即文档可视的部分，50vh就是视口高度的50/100，设置50vh上边距

```css
#son{
	/*0如果去掉，则会多出滚动条并且上下都是50vh的margin。如果去掉就给body加上overflow:hidden;*/
    margin: 50vh auto 0;  
    transform: translateY(-50%);
}
```

#### 两列布局

###### 左列顶宽，右列自适应

（1）float+margin

html代码:

```html
<body>
<div id="left">左列定宽</div>
<div id="right">右列自适应</div>
</body>
复制代码
```

css代码:

```css
#left {
    background-color: #f00;
    float: left;
    width: 100px;
    height: 500px;
}
#right {
    background-color: #0f0;
    height: 500px;
    margin-left: 100px; /*大于等于#left的宽度*/
}
```

（2）利用float+overflow实现

html代码:

```html
<body>
<div id="left">左列定宽</div>
<div id="right">右列自适应</div>
</body>
复制代码
```

css代码:

```css
#left {
    background-color: #f00;
    float: left;
    width: 100px;
    height: 500px;
}
#right {
    background-color: #0f0;
    height: 500px;
    overflow: hidden; /*触发bfc达到自适应*/
}
```

（3）使用绝对定位实现

html代码:

```html
<body>
<div id="parent">
    <div id="left">左列定宽</div>
    <div id="right">右列自适应</div>
</div>
</body>
复制代码
```

css代码:

```css
#parent{
    position: relative;  /*子绝父相*/
}
#left {
    position: absolute;
    top: 0;
    left: 0;
    background-color: #f00;
    width: 100px;
    height: 500px;
}
#right {
    position: absolute;
    top: 0;
    left: 100px;  /*值大于等于#left的宽度*/
    right: 0;
    background-color: #0f0;
    height: 500px;css
}
```

（4）使用flex实现

html代码:

```html
<body>
<div id="parent">
    <div id="left">左列定宽</div>
    <div id="right">右列自适应</div>
</div>
</body>


复制代码
```

css代码:

```css
#parent{
    width: 100%;
    height: 500px;
    display: flex;
}
#left {
    width: 100px;
    background-color: #f00;
}
#right {
    flex: 1; /*均分了父元素剩余空间*/
    background-color: #0f0;
}
```

###### 左列自适应，右列定宽

（1）margin+float

html代码:

```html
<body>
<div id="parent">
    <div id="left">左列自适应</div>
    <div id="right">右列定宽</div>
</div>
</body>

复制代码
```

css代码:

```css
#parent{
    height: 500px;
    padding-left: 100px;  /*抵消#left的margin-left以达到#parent水平居中*/
}
#left {
    width: 100%;
    height: 500px;
    float: left;
    margin-left: -100px; /*正值等于#right的宽度*/
    background-color: #f00;
}
#right {
    height: 500px;
    width: 100px;
    float: right;
    background-color: #0f0;
}
```

（2）使用绝对定位实现

html代码:

```html
<body>
<div id="parent">
    <div id="left">左列自适应</div>
    <div id="right">右列定宽</div>
</div>
</body>

复制代码
```

css代码:

```css
#parent{
    position: relative;  /*子绝父相*/
}
#left {
    position: absolute;
    top: 0;
    left: 0;
    right: 100px;  /*大于等于#rigth的宽度*/
    background-color: #f00;
    height: 500px;
}
#right {
    position: absolute;
    top: 0;
    right: 0;
    background-color: #0f0;
    width: 100px;
    height: 500px;
}
```

###### 一列不定，一列自适应

![](https://user-gold-cdn.xitu.io/2018/3/9/1620a136d1676e57?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

（1）使用float+overflow实现

html代码:

```html
<body>
<div id="parent">
    <div id="left">左列不定宽</div>
    <div id="right">右列自适应</div>
</div>
</body>

复制代码
```

css代码:

```css
#left {
    margin-right: 10px;
    float: left;  /*只设置浮动,不设宽度*/
    height: 500px;
    background-color: #f00;
}
#right {
    overflow: hidden;  /*触发bfc*/
    height: 500px;
    background-color: #0f0;
}
```

（2）flex

html代码:

```html
<body>
<div id="parent">
    <div id="left">左列不定宽</div>
    <div id="right">右列自适应</div>
</div>
</body>

复制代码
```

css代码:

```css
#parent{
    display: flex;
}
#left { /*不设宽度*/
    margin-right: 10px;
    height: 500px;
    background-color: #f00;
}
#right {
    height: 500px;
    background-color: #0f0;
    flex: 1;  /*均分#parent剩余的部分*/
}
```

#### 三列布局

###### 两列定宽，一列自适应

（1）float+margin

html代码:

```html
<body>
<div id="parent">
    <div id="left">左列定宽</div>
    <div id="center">中间定宽</div>
    <div id="right">右列自适应</div>
</div>
</body>

复制代码
```

css代码:

```css
#parent{
    min-width: 310px; /*100+10+200,防止宽度不够,子元素换行*/
}
#left {
    margin-right: 10px;  /*#left和#center间隔*/
    float: left;
    width: 100px;
    height: 500px;
    background-color: #f00;
}
#center{
    float: left;
    width: 200px;
    height: 500px;
    background-color: #eeff2b;
}
#right {
    margin-left: 320px;  /*等于#left和#center的宽度之和加上间隔,多出来的就是#right和#center的间隔*/
    height: 500px;
    background-color: #0f0;
}
```

（2）flex

html代码:

```html
<body>
<div id="parent">
    <div id="left">左列定宽</div>
    <div id="center">中间定宽</div>
    <div id="right">右列自适应</div>
</div>
</body>

复制代码
```

css代码:

```css
#parent {
    height: 500px;
    display: flex;
}
#left {
    margin-right: 10px;  /*间距*/
    width: 100px;
    background-color: #f00;
}
#center {
    margin-right: 10px;  /*间距*/
    width: 200px;
    background-color: #eeff2b;
}
#right {
    flex: 1;  /*均分#parent剩余的部分达到自适应*/
    background-color: #0f0;
}
```

###### 两侧定宽，中间自适应

（1）双飞翼布局

html代码:

```html
<body>
<div id="header"></div>
<!--中间栏需要放在前面-->
<div id="parent">
    <div id="center">
        <div id="center_inbox">中间自适应</div>
        <hr>  <!--方便观察原理-->
    </div>
    <div id="left">左列定宽</div>
    <div id="right">右列定宽</div>
</div>
<div id="footer"></div>
</body>

复制代码
```

css代码:

```css
#header {
    height: 60px;
    background-color: #ccc;
}
#left {
    float: left;
    width: 100px;
    height: 500px;
    margin-left: -100%; /*调整#left的位置,值等于自身宽度*/
    background-color: #f00;
    opacity: 0.5;
}
#center {
    height: 500px;
    float: left;
    width: 100%;
    background-color: #eeff2b;
}
#center_inbox{
    height: 480px;
    border: 1px solid #000;
    margin: 0 220px 0 120px;  /*关键!!!左右边界等于左右盒子的宽度,多出来的为盒子间隔*/
}
#right {
    float: left;
    width: 200px;
    height: 500px;
    margin-left: -200px;  /*使right到指定的位置,值等于自身宽度*/
    background-color: #0f0;
    opacity: 0.5;
}
#footer {
    clear: both;  /*注意清除浮动!!*/
    height: 60px;
    background-color: #ccc;
}
```

（2）使用flex实现

html代码:

```html
<body>
<div id="parent">
    <div id="left">左列定宽</div>
    <div id="center">中间自适应</div>
    <div id="right">右列定宽</div>
</div>
</body>

复制代码
```

css代码:

```css
#parent {
    height: 500px;
    display: flex;
}
#left {
    width: 100px;
    background-color: #f00;
}
#center {
    flex: 1;  /*均分#parent剩余的部分*/
    background-color: #eeff2b;
}
#right {
    width: 200px;
    background-color: #0f0;
}
```

（3）使用定位实现

html代码:

```html
<body>
<div id="parent">
    <div id="left">左列定宽</div>
    <div id="center">中间自适应</div>
    <div id="right">右列定宽</div>
</div>
</body>

复制代码
```

css代码:

```css
#parent {
    position: relative; /*子绝父相*/
}
#left {
    position: absolute;
    top: 0;
    left: 0;
    width: 100px;
    height: 500px;
    background-color: #f00;
}
#center {
    height: 500px;
    margin-left: 100px; /*大于等于#left的宽度,或者给#parent添加同样大小的padding-left*/
    margin-right: 200px;  /*大于等于#right的宽度,或者给#parent添加同样大小的padding-right*/
    background-color: #eeff2b;
}
#right {
    position: absolute;
    top: 0;
    right: 0;
    width: 200px;
    height: 500px;
    background-color: #0f0;
}
```

###### 上下固定中间自适应布局

```css
利用绝对定位实现
body {
  padding: 0;
  margin: 0;
}

.header {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100px;
  background: red;
}

.container {
  position: absolute;
  top: 100px;
  bottom: 100px;
  width: 100%;
  background: green;
}

.footer {
  position: absolute;
  bottom: 0;
  height: 100px;
  width: 100%;
  background: red;
}

利用flex布局实现html,
body {
  height: 100%;
}

body {
  display: flex;
  padding: 0;
  margin: 0;
  flex-direction: column;
}

.header {
  height: 100px;
  background: red;
}

.container {
  flex-grow: 1;
  background: green;
}

.footer {
  height: 100px;
  background: red;
}
```



#### div居中

```css
border: 1px solid red;
margin: 0 auto; 
height: 50px;
width: 80px;/*必须设置宽度*/
```

#### 浮动元素的上下左右居中

```css
border: 1px solid red;
float: left;
position: absolute;
width: 200px;
height: 100px;
left: 50%;
top: 50%;
margin: -50px 0 0 -100px; 
```

#### 绝对定位的左右居中

```css
border: 1px solid black;
position: absolute;
width: 200px;
height: 100px;
margin: 0 auto;
left: 0;
right: 0; 
```

#### 不定宽高的div垂直水平居中

1. 使用flex布局，在其父元素中设置

   ```css
   height: 50px;
   display: flex;
   justify-content: center;
   align-items: center;
   ```

2. 使用css3 transform

   在父元素中设置position:relative;其子元素设为absolute，使子元素可以根据父元素进行定位

   ```css
   /*父元素*/
   potition: relative;
   
   /*子元素*/
   
   transform: translate(-50%,-50%);/*由于自身也具有宽高，所以得往回缩*/
   position: absolute;
   top: 50%;
   left: 50%;
   ```

## display值

* inline（默认） 内联元素
* none 隐藏
* block 块级元素
* table 表格显示
* list-item 项目列表
* inline-block

## position值

* static（默认）：按照正常文档流进行排列
* relative（相对定位）：不脱离文档流，参考自身静态位置通过top、bottom、left、right定位。移动后的元素在原来的位置仍占空间。
* absolute（绝对定位）：参考距其最近一个不为static的父级元素通过top、bottom、left、right定位。在文档流中不占位置。
* fixed（固定定位）：所固定的参照对象是可视窗口。在文档流中不占空间。

绝对定位元素的宽高百分比是相对于临近的position不为static的祖先元素的padding box来计算的。

非绝对定位元素的宽高百分比是相对于父元素的content box来计算的。

## margin和padding的使用场景

> margin是用于隔开元素与元素间的距离，padding是用来隔开元素与内容的间隔。

margin使用场景：

* 需要在border外添加白色时
* 空白处不需要背景色时
* 上下相连的盒子之间的空白，需要相互抵消时。如15px+20px，将得到20px的空白

padding使用场景

* 需要在border内侧添加空白
* 空白处需要背景色
* 上下相连的两个盒子之间的空白，希望等于两者之和时。

## 浮动

* left：元素向左浮动
* right：元素向右浮动
* none：默认值。元素不浮动，并会显示在其在文本中出现的位置。

#### 浮动特性

* 浮动元素会从普通的文档流中脱离，但浮动元素影响的不仅是自己，它会影响周围的元素对其进行环绕。
* 不管一个元素是行内元素还是块级元素，如果被设置了浮动，那浮动元素会自动转为`display:block`，生成一个块级框，可以设置它的width和height。

#### 重叠问题

* 行内元素与浮动元素发生重叠，其边框、背景和内容都会显示在浮动元素之上。
* 块级元素与浮动元素发生重叠时，边框和背景会显示在浮动元素之下，内容会显示在浮动元素之上。

#### clear

确保当前元素的左右两侧不会有浮动元素。clear只对元素本身的布局起作用。取值：left，right，both

#### 解决浮动塌陷

一个块级元素如果没有设置height，那么其height便是由子元素撑开的。对其子元素使用浮动后，子元素会脱离标准文档流，也就是说，父元素中没有内容可以撑开其高度，这样父级元素的height就会被忽略，这就是所谓的高度塌陷。

解决方法如下：

```css
.parent{
	background-color: red;
}
/* 设置伪类解决浮动塌陷 */
.parent::after{
    content: '';
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
}
.child{
    color: gray;
    float: left;
}
```

## 为什么要初始化CSS样式

因为浏览器的兼容问题，不同浏览器对有些标签的默认值是不同的，如果没对CSS初始化往往会出现浏览器之间的页面显示差异。

## display:none与visibility：hidden的区别？

display：none 不显示对应的元素，在文档布局中不再分配空间（回流+重绘）
visibility：hidden 隐藏对应元素，在文档布局中仍保留原来的空间（重绘）

以上两个均不可触发事件。

## CSS里的visibility属性有个collapse属性值？在不同浏览器下以后什么区别？

当一个元素的visibility属性被设置成collapse值后，对于一般的元素，它的表现跟hidden是一样的。

1. chrome中，使用collapse值和使用hidden没有区别。
2. firefox，opera和IE，使用collapse值和使用display：none没有什么区别

当把opacity设为0后，在我们眼里也算是隐藏了，但它依旧在页面里，且可以触发事件。

## BFC

> W3C对BFC的定义如下： 浮动元素和绝对定位元素，非块级盒子的块级容器（例如 inline-blocks, table-cells, 和 table-captions），以及overflow值不为"visiable"的块级盒子，都会为他们的内容创建新的BFC（Block Fromatting Context， 即块级格式上下文）。

通俗来讲

* BFC是一个独立的布局环境，可以理解为一个容器，在这个容器中按照一定规则进行物品摆放，并且不影响其他环境中的物品。
* 如果一个元素符合触发BFC的条件，则BFC中的元素布局不受外部影响。

#### 触发条件

一个HTML元素要创建BFC，则满足下列的任意一个或多个条件即可： 下列方式会创建块格式化上下文：

- 根元素()
- 浮动元素（元素的 float 不是 none）
- 绝对定位元素（元素的 position 为 absolute 或 fixed）
- 行内块元素（元素的 display 为 inline-block）
- 表格单元格（元素的 display为 table-cell，HTML表格单元格默认为该值）
- 表格标题（元素的 display 为 table-caption，HTML表格标题默认为该值）
- 匿名表格单元格元素（元素的 display为 table、table-row、 table-row-group、table-header-group、table-footer-group（分别是HTML table、row、tbody、thead、tfoot的默认属性）或 inline-table）
- overflow 值不为 visible 的块元素 -弹性元素（display为 flex 或 inline-flex元素的直接子元素）
- 网格元素（display为 grid 或 inline-grid 元素的直接子元素） 等等。

#### BFC渲染机制

（1）BFC垂直方向边距重叠

（2）BFC的区域不会与浮动元素的box重叠

（3）BFC是一个独立的容器，外面的元素不会影响里面的元素

（4）计算BFC高度的时候浮动元素也会参与计算

#### 应用场景

* 避免外边距折叠
* 防止浮动导致父元素高度塌陷

## px,em,rem的区别

**px**：绝对单位。像素 px 是`相对于显示器屏幕分辨率`而言的，是一个虚拟长度单位，是计算 机系统的数字化图像长度单位，如果 px 要换算成物理长度，需要指定精度 DPI。

**em**：是相对长度单位，`相对于父级元素的字体尺寸`。如当前对行内文本的字体尺寸未被人为设置， 则相对于浏览器的默认字体尺寸。它会继承父级元素的字体大小，因此并不是一个固定的值。

**rem** ：是 CSS3 新增的一个相对单位(root em，根 em)，使用 rem 为元素设定字体大小时，仍然是相对大小， 但`相对的只是 HTML 根元素`。

## link和@import的区别

* link是XHTML标签，除了可以引入css之外，还可以定义RSS等其他事务；import属于CSS范畴，只能加载css。
* link在引入css时，css和页css面是同时加载，但是@import css需要等待页面完全载入后才能加载。
* link没有兼容问题，但是@import具有兼容问题 
* link支持JavaScript控制DOM去改变样式，但是@import不支持

## Flex布局

```
Flex是FlexibleBox的缩写，意为"弹性布局"，用来为盒状模型提供最大的灵活性。

任何一个容器都可以指定为Flex布局。行内元素也可以使用Flex布局。注意，设为Flex布局以后，子元素的float、cl
ear和vertical-align属性将失效。

采用Flex布局的元素，称为Flex容器（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为Flex项目（flex item），简称"项目"。

容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis），项目默认沿主轴排列。


以下6个属性设置在容器上。

flex-direction属性决定主轴的方向（即项目的排列方向）。

flex-wrap属性定义，如果一条轴线排不下，如何换行。

flex-flow属性是flex-direction属性和flex-wrap属性的简写形式，默认值为row nowrap。

justify-content属性定义了项目在主轴上的对齐方式。

align-items属性定义项目在交叉轴上如何对齐。

align-content属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。


以下6个属性设置在项目上。

order属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。

flex-grow属性定义项目的放大比例，默认为0，即如果存在剩余空间，也不放大。

flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。

flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间。浏览器根据这个属性，计算主轴是否有多余空间。它的默认值为auto，即项目的本来大小。

flex属性是flex-grow，flex-shrink和flex-basis的简写，默认值为0 1 auto。

align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。默认值为auto，表示继承父
元素的align-items属性，如果没有父元素，则等同于stretch。
```

## 品字布局

非满屏

```html
<!doctype html>
<html>

<head>
  <meta charset="utf-8">
  <title>品字布局</title>
  <style>
    * {
      margin: 0;
      padding: 0;
    }
    body {
      overflow: hidden;
    }
    div {
      margin: auto 0;
      width: 100px;
      height: 100px;
      background: red;
      font-size: 40px;
      line-height: 100px;
      color: #fff;
      text-align: center;
    }

    .div1 {
      margin: 100px auto 0;
    }

    .div2 {
      margin-left: 50%;
      background: green;
      float: left;
      transform: translateX(-100%);
    }

    .div3 {
      background: blue;
      float: left;
      transform: translateX(-100%);
    }
  </style>
</head>

<body>
  <div class="div1">1</div>
  <div class="div2">2</div>
  <div class="div3">3</div>
</body>

</html>
```

满屏：

```html
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>品字布局</title>
    <style>
      * {
        margin: 0;
        padding: 0;
      }

      div {
        width: 100%;
        height: 100px;
        background: red;
        font-size: 40px;
        line-height: 100px;
        color: #fff;
        text-align: center;
      }

      .div1 {
        margin: 0 auto 0;
      }

      .div2 {
        background: green;
        float: left;
        width: 50%;
      }

      .div3 {
        background: blue;
        float: left;
        width: 50%;
      }
    </style>
  </head>

  <body>
    <div class="div1">1</div>
    <div class="div2">2</div>
    <div class="div3">3</div>
  </body>
</html>

```

## CSS多列等高

* 使用margin和padding相抵消

  ```css
  .Article {
    overflow: hidden;
  }
  
  .Article>li {
    float: left;
    margin: 0 10px -9999px 0;
    padding-bottom: 9999px;
    background: #4577dc;
    width: 200px;
    color: #fff;
  }
  
  .Article>li>p {
    padding: 10px;
  }
  ```

* flex布局

  ```css
  .Article {
    display: flex;
  }
  ```

  flex中的伸缩项目默认为拉伸为父元素的高度，同样可以实现等高效果。在pc端兼容性不是很好，在ie9以及ie9以下不支持。

## li与li之间的空白间隔

浏览器会把inline元素间的空白字符（空格、换行、Tab等）渲染成一个空格。而为了美观，我们通常是一个li一行，这就导致在换行时多出了一个空格。

## 图片base64编码

base64编码是一种图片处理格式，通过特定的算法将图片编码成一长字符串，在页面上显示的时候，可以用该字符串来代替图片url属性。

使用base64的优点是：

（1）减少一个图片的HTTP请求

使用base64的缺点是：

（1）根据base64的编码原理，编码后的大小会比原文件大小大1/3，如果把大图片编码到html/css中，不仅会造成文件体积的增加，影响文件的加载速度，还会增加浏览器对html或css文件解析渲染的时间。

（2）使用base64无法直接缓存，要缓存只能缓存包含base64的文件，比如HTML或者CSS，这相比域直接缓存图片的效果要差很多。

（3）兼容性的问题，ie8以前的浏览器不支持。

一般一些网站的小图标可以使用base64图片来引入。

## IFC是什么

IFC指的是行级格式化上下文，它有这样的一些布局规则：

（1）行级上下文内部的盒子会在水平方向，一个接一个地放置。
（2）当一行不够的时候会自动切换到下一行。
（3）行级上下文的高度由内部最高的内联盒子的高度决定。

## CSS提高性能

加载性能：

（1）css压缩：将写好的css进行打包压缩，可以减少很多的体积。
（2）css单一样式：当需要下边距和左边距的时候，很多时候选择:margin:top 0 bottom 0;但margin-bottom:bottom;margin-left:left;执行的效率更高。
（3）减少使用@import,而建议使用link，因为后者在页面加载时一起加载，前者是等待页面加载完成之后再进行加载。

选择器性能：

（1）关键选择器（key selector）。选择器的最后面的部分为关键选择器（即用来匹配目标元素的部分）。CSS选择符是从右到左进行匹配的。当使用后代选择器的时候，浏览器会遍历所有子元素来确定是否是指定的元素等等；

（2）如果规则拥有ID选择器作为其关键选择器，则不要为规则增加标签。过滤掉无关的规则（这样样式系统就不会浪费时间去匹配它们了）。

（3）避免使用通配规则，如*{}计算次数惊人！只对需要用到的元素进行选择。

（4）尽量少的去对标签进行选择，而是用class。

（5）尽量少的去使用后代选择器，降低选择器的权重值。后代选择器的开销是最高的，尽量将选择器的深度降到最低，最高不要超过三层，更多的使用类来关联每一个标签元素。

（6）了解哪些属性是可以通过继承而来的，然后避免对这些属性重复指定规则。

渲染性能：

（1）慎重使用高性能属性：浮动、定位。

（2）尽量减少页面重排、重绘。

（3）去除空规则：｛｝。空规则的产生原因一般来说是为了预留样式。去除这些空规则无疑能减少css文档体积。

（4）属性值为0时，不加单位。

（5）属性值为浮动小数0.**，可以省略小数点之前的0。

（6）标准化各种浏览器前缀：带浏览器前缀的在前。标准属性在后。

（7）不使用@import前缀，它会影响css的加载速度。

（8）选择器优化嵌套，尽量避免层级过深。

（9）css雪碧图，同一页面相近部分的小图标，方便使用，减少页面的请求次数，但是同时图片本身会变大，使用时，优劣考虑清楚，再使用。

（10）正确使用display的属性，由于display的作用，某些样式组合会无效，徒增样式体积的同时也影响解析性能。

（11）不滥用web字体。对于中文网站来说WebFonts可能很陌生，国外却很流行。web fonts通常体积庞大，而且一些浏览器在下载web fonts时会阻塞页面渲染损伤性能。

可维护性、健壮性：

（1）将具有相同属性的样式抽离出来，整合并通过class在页面中进行使用，提高css的可维护性。
（2）样式与内容分离：将css代码定义到外部css中。

## 有一个高度自适应的 div，里面有两个 div，一个高度 100px，希望另一个填满剩下的高度

（1）外层div使用position：relative；高度要求自适应的div使用position:absolute;top:100px;bottom:0;
left:0;right:0;

（2）使用flex布局，设置主轴为竖轴，第二个div的flex-grow为1。

## style 标签写在 body 后与 body 前有什么区别

页面加载自上而下当然是先加载样式。写在body标签后由于浏览器以逐行方式对HTML文档进行解析，当解析到写在尾部的样式表（外联或写在style标签）会导致浏览器停止之前的渲染，等待加载且解析样式表完成之后重新渲染，在windows的IE下可能会出现FOUC现象（即样式失效导致的页面闪烁问题）

## 实现一个宽高自适应的正方形

```css
/*1.第一种方式是利用vw来实现*/
.square {
  width: 10%;
  height: 10vw;
  background: tomato;
}

/*2.第二种方式是利用元素的margin/padding百分比是相对父元素width的性质来实现*/
.square {
  width: 20%;
  height: 0;
  padding-top: 20%;
  background: orange;
}

/*3.第三种方式是利用子元素的margin-top的值来实现的*/
.square {
  width: 30%;
  overflow: hidden;
  background: yellow;
}

.square::after {
  content: '';
  display: block;
  margin-top: 100%;
}
```

## CSS 中不同属性设置为百分比%时对应的计算基准

```
公式：当前元素某CSS属性值 = 基准 * 对应的百分比
元素的 position 为 relative 和 absolute 时，top和bottom、left和right基准分别为包含块的 height、width
元素的 position 为 fixed 时，top和bottom、left和right基准分别为初始包含块（也就是视口）的 height、width，移动设备较为复杂，基准为 Layout viewport 的 height、width
元素的 height 和 width 设置为百分比时，基准分别为包含块的 height 和 width
元素的 margin 和 padding 设置为百分比时，基准为包含块的 width（易错）
元素的 border-width，不支持百分比
元素的 text-indent，基准为包含块的 width

元素的 border-radius，基准为分别为自身的height、width
元素的 background-size，基准为分别为自身的height、width
元素的 translateX、translateY，基准为分别为自身的height、width
元素的 line-height，基准为自身的 font-size

元素的 font-size，基准为父元素字体
```

## 单行/多行文本溢出的省略

```css
/*单行文本溢出*/
p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/*多行文本溢出*/
p {
  position: relative;
  line-height: 1.5em;
  /*高度为需要显示的行数*行高，比如这里我们显示两行，则为3*/
  height: 3em;
  overflow: hidden;
}

p:after {
  content: '...';
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #fff;
}
```

## 如何画一条0.5px的线

1. 采用meta viewport的方式

   ```html
   <meta name="viewport" content="width=device-width, initial-scale=0.5, minimum-scale=0.5, maximum-scale=0.5"/>
   ```

   但仅针对移动端，将其缩放0.5，这样设置1px即为0.5px

2. 采用transform: scale()的方式

   ```css
   transform: scale(0.5,0.5);
   ```

   