# 浏览器之TCP协议

> 在网络中，一个文件通常被拆分为很多数据包来传输，而数据包在传输的过程中又有很大概率丢失或出错。那么如何保证页面文件被完整地送达浏览器呢？

#### 一、数据包如何送达主机

> 计算机的地址就称为IP地址，访问任何网站实际上只是你的计算机向另一台计算机请求信息。

* 数据包要在互联网上进行传输，就要符合网际协议（简称IP）标准
* 如果想把数据包从主机A发送到主机B，在传输之前，数据包会被附上主机B的IP地址信息

![11](https://raw.githubusercontent.com/wind-jyf/blog/master/images/11.png)

下面是数据包从主机A到主机B的旅程：

1. 上层将数据包交给网络层
2. 网络层将IP头附加到数据包上，组成新的IP数据包，交给底层
3. 底层通过物流网络将数据传输给主机B
4. 数据包被传输到主机B的网络层，拆开数据包的IP头信息，并将拆开的数据部分交给上层
5. 最后，数据包就到达主机B的上层了



#### 二、把数据包送达应用程序

> IP协议只负责将数据包传送到对方电脑，那如何将数据包送到某个应用程序呢？

**用户数据包协议**，简称**UPD**，是基于IP之上开发能和应用打交道的协议。

UPD中最重要的信息就是端口号，IP是通过IP地址信息把数据包发送到指定的电脑，而UDP是通过端口号把数据包分发给正确的程序。![12](https://raw.githubusercontent.com/wind-jyf/blog/master/images/12.png)

下面是数据包从主机A到主机B的旅程：

1. 数据包交给传输层
2. 传输层附加上UDP头，再交给网络层
3. 网络层再附加上IP头，交给底层
4. 数据包传输到主机B的网络层，拆开IP头信息，并把剩余部分交给传输层
5. 传输层中将UDP头拆开，并根据UDP中所提供的端口号，把数据部分交给上层的应用程序
6. 最后，数据包便到了主机B对应的应用程序



但是，在使用UDP发送数据时，有各种因素导致数据包出错，由于UDP不提供重发机制，只能丢弃当前的包，而且UDP在发送之后也无法知道是否能到达目的地。

虽说**UDP不能保证数据的可靠性，但是传输速度却非常快**。



#### 三、把数据完整地送达应用程序

在使用UDP来传输时会存在两个问题：

1. 数据包在传输过程中容易丢失
2. 大文件会被拆分成许多小数据包来传输，这些小的数据包会经过不同的路由，并在不同的时间到达接收端，而UDP协议并不知道如何组装这些数据包，从而把这些数据包还原成完整的文件

**TCP（传输控制协议）是一种面向连接的、可靠的、基于字节流的传输层通信协议**

* 对于数据包丢失情况，TCP协议提供重传协议
* 还提供了用于排列的序列号，以便接收端通过序号来重排数据包

![13](https://raw.githubusercontent.com/wind-jyf/blog/master/images/13.png)



下面再来看看完整的TCP连接过程，一个完整的TCP连接的生命周期包括“建立连接”、“传输数据”、“断开连接”三个阶段。

![14](https://raw.githubusercontent.com/wind-jyf/blog/master/images/14.png)



TCP为了保证数据传输的可靠性，牺牲了数据包的传输速度，因为“三次握手”和“数据包校验机制”等把传输过程中的数据包的数量提高了一倍。



#### 四、参考：

***

* 极客时间 浏览器工作原理与实战