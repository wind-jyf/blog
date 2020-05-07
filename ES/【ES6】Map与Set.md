# Map与Set

##### Map对象

* Map的键可以是任意值
* Map中的键值是有序的
* Map中的键值对个数可以从size属性获取
* Map中的key可以是字符串、对象、函数、NaN

###### Map中的key是NaN

```javascript
var myMap = new Map();
myMap.set(NaN,"not a nubmer");

console.log(myMap.get(NaN));//not a nubmer
```

注：虽然NaN和任何值都不相等，但NaN作为Map的键来说没有任何区别

###### Map的迭代

* for.....of

```javascript
// 将会显示两个 log。 一个是 "0 = zero" 另一个是 "1 = one"
for (var [key, value] of myMap) {
  console.log(key + " = " + value);
}
```



* forEach()

```javascript
var myMap = new Map();
myMap.set(0, "zero");
myMap.set(1, "one");
 
// 将会显示两个 logs。 一个是 "0 = zero" 另一个是 "1 = one"
myMap.forEach(function(value, key) {
  console.log(key + " = " + value);
}, myMap)
```

###### Map与Array的转换

* Map构造函数将Array转换为Map
* Array.from将Map转换为Array

###### Map的克隆

```javascript
var myMap1 = new Map([["key1", "value1"], ["key2", "value2"]]);
var myMap2 = new Map(myMap1);
 
console.log(myMap1 === myMap2); //false
```

###### Map的合并

```javascript
var first = new Map([[1, 'one'], [2, 'two'], [3, 'three'],]);
var second = new Map([[1, 'uno'], [2, 'dos']]);
var merged = new Map([...first, ...second]);
console.log(merged);//Map { 1 => 'uno', 2 => 'dos', 3 => 'three' }
```

注：如果有重复的键值，则后面的会覆盖前面的

***



#### Set对象（集合）

* set对象存储的是唯一值，无论是原始值还是对象引用
* +0和-0在存储判断唯一性的时候是恒等的
* undefined与undefined是恒等的
* NaN与NaN是不恒等的，但是在Set中只能存一个

###### 数组去重

```javascript
var array = [1, 2, 3, 4, 4];
var mySet = new Set(array);//将数组转换为集合
mySet.add(5)//向集合中添加一个数
console.log(mySet);//Set { 1, 2, 3, 4, 5 }
console.log([...mySet]);//[ 1, 2, 3, 4, 5 ] //将集合转换为数组
```

###### 求并集、交集、差集

* 并集

```javascript
var a = new Set([1, 2, 3]);
var b = new Set([4, 3, 2]);
var union = new Set([...a, ...b]); // {1, 2, 3, 4}
```

* 交集

```javascript
var a = new Set([1, 2, 3]);
var b = new Set([4, 3, 2]);
var intersect = new Set([...a].filter(x => b.has(x))); // {2, 3}
```

* 差集

```javascript
var a = new Set([1, 2, 3]);
var b = new Set([4, 3, 2]);
var difference = new Set([...a].filter(x => !b.has(x))); // {1}
```

**注：filter是数组的相关方法，所以需要先将集合转换为数组**

***

***End***

***by wind-jyf***

