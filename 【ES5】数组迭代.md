# 数组迭代

#### every

1. 迭代整个数组
2. 如果数组中的每项均返回布尔值，则方法返回布尔值
3. 有三个参数，后两个均是可省的
4. index从0开始
5. 只要出现返回值为false，迭代便会终止
6. 返回值为布尔值

```javascript
var numbers = [1,2,3,4,5];				//item为数组的项
										//index为下标
										//array为数组对象
var everyResult = numbers.every(function(item,index,array){
    return item>2;
})

console.log(everyResult);//false
```

使用箭头符号后

1. 如果只有一个参数，可省略()
2. 如果只有一个return，可以省略{}

```javascript
var numbers = [1,2,3,4,5];
var everyResult = numbers.every(item=>(item>2))

console.log(everyResult);//false
```



#### some

1. 迭代整个数组
2. 如果数组中的有一项返回布尔值，则方法返回布尔值
3. index同样从0开始
4. 只要有一项此时为true，迭代便会终止

```javascript
var numbers = [1,2,3,4,5];				
var everyResult = numbers.some(function(item,index,array){
    return item>2;
})

console.log(everyResult);//true
```

使用箭头符号后

```javascript
var numbers = [1,2,3,4,5];
var everyResult = numbers.some(item=>(item>2))

console.log(everyResult);//true
```



#### map

1. 迭代整个数组
2. 返回一个数组
3. 原本有多少项，返回的数组也有多少项
4. index从0开始
5. 返回的数组内容为每一次的返回值

```javascript
var numbers = [1,2,3,4,5];				
var everyResult = numbers.map(function(item,index,array){
    return item>2;
})

console.log(everyResult);//[ false, false, true, true, true ]
```

使用箭头函数后

```javascript
var numbers = [1,2,3,4,5];
var everyResult = numbers.map(item=>(item>2))

console.log(everyResult);//[ false, false, true, true, true ]
```



#### filter

1. 迭代整个数组
2. 返回值为数组
3. index从0开始
4. 返回的数组内容为运行给定函数返回值为true的项

```javascript
var numbers = [1,2,3,4,5];				
var everyResult = numbers.filter(function(item,index,array){
    return item>2;
})

console.log(everyResult);//[ 3, 4, 5 ]
```



#### forEach

1. 迭代整个数组
2. 没有返回值
3. 只是运行给定函数
4. 不会修改原数组中的内容
5. index从0开始

```javascript
var numbers = [1,2,3,4,5];
var everyResult = numbers.forEach(item=>(item*2))

console.log(everyResult);//undefined
console.log(numbers);//[ 1, 2, 3, 4, 5 ]
```



#### reduce

1. 迭代整个数组
2. 有两个参数，第一个参数是一个累加器函数，第二个参数为累加初始值
3. 如果没有第二个参数，则初始值为数组的第一个，index为1
4. 如果有第二个参数，则Index为0
5. 最后返回值为第一个参数的值

```javascript
var numbers = [1,2,3,4,5];
var everyResult = numbers.reduce((pre,next,index)=>{
  return pre*next;
})

console.log(everyResult);//120
```

###### 重写reduce

1. 首先拿到数组对象，即this
2. 判断是否有第二个参数
3. 进行for循环，进行“累加”
4. 返回最后结果
5. 将方法通过原型加入数组对象

```javascript
function myReduce(fn,initItem){//fn为累加函数，initItem为初始值
  let arr = this;
  let i =0;//设置开始索引
  let prevItem = null;//设置累加值
  if(typeof initItem !=="undefined"){//如果有第二个参数
    i=0;
    prevItem = initItem;//设置初始值
  }else{
    i=1;
    prevItem = arr[0];
  }

  for(i;i<arr.length;i++){
    if(typeof fn =="function"){
      prevItem = fn(prevItem,arr[i],i,arr);
    }
  }
  return prevItem;
}
Array.prototype.myReduce = myReduce;
let a = [1,2,3,4,5];
let c = a.myReduce((pre,next,index)=>{
  console.log(index);//0,1,2,3,4
  return pre*next;
},2);

console.log(c);//240
```



***

***End***

***by wind-jyf***

