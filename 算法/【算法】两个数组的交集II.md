# 两个数组的交集II

#### 一、题目详情

 给定两个数组，编写一个函数来计算它们的交集。 

 **示例 1:** 

```javascript
输入: nums1 = [1,2,2,1], nums2 = [2,2]
输出: [2,2]
```

 **示例 2:** 

```javascript
输入: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
输出: [4,9]
```

**说明：**

- 输出结果中每个元素出现的次数，应与元素在两个数组中出现的次数一致。
- 我们可以不考虑输出结果的顺序。

 **进阶:** 

* 如果给定的数组已经排好序呢？你将如何优化你的算法？
* 如果 nums1 的大小比 nums2 小很多，哪种方法更优？
* 如果 nums2 的元素存储在磁盘上，磁盘内存是有限的，并且你不能一次加载所有的元素到内存中，你该怎么办？

#### 二、解题思路

1. 使用map记录nums1中，每个值出现的次数
2. 遍历nums2，如果检测出，相应的次数大于0，便加入到结果中，并将相应的次数-1

#### 三、代码实现

````javascript
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function(nums1, nums2) {
    let map = new Map();
    let result = [];
    for(let i = 0;i<nums1.length;i++){
        let value = map.get(nums1[i]);
        if(value>0){
            map.set(nums1[i],++value);
        }else{
            map.set(nums1[i],1);
        }
    }
    for(let i = 0 ;i<nums2.length;i++){
        let value = map.get(nums2[i]);
        if(value>0){
            result.push(nums2[i]);
            map.set(nums2[i],--value);
        }
    }
    return result;
};
````



#### 参考：

***

* [两个数组的交集II]( https://mp.weixin.qq.com/s/tZus_A-lGGYrhvwPwSSrSw )