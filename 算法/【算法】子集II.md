# 子集II

####  一、题目描述

给定一个可能包含重复元素的整数数组 **nums**，返回该数组所有可能的子集（幂集）。 

 **说明：**解集不能包含重复的子集。 

**示例:**

```javascript
输入: [1,2,2]
输出:
[
  [2],
  [1],
  [1,2,2],
  [2,2],
  [1,2],
  []
]
```

#### 二、解题思路

其实就是在无重复的基础上，进行去重。

例如[1,2,2]

* 先将1加入子集,[[],[1]]
* 将2加入子集[[],[1],[2],[1,2]]
* 再将2加入时，可以看看到底为什么重复了，如果我们重复了上一步加入的那一部分，便会有重复，所以要设置一个变量记录上一步添加的长度

1. 首先进行排序，将重复的数组排在一起
2. 每次都记录当次添加元素前的数组长度为temp
3. 如果出现后一个数组和前一个数组相等，则从temp开始再添加元素
4. 如果出现不相等了，就从头开始添加元素

#### 三、代码实现

```javascript
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function(nums) {
    if(nums.length == 0 ||nums==null){
        return [[]]
    }
    nums.sort((a,b)=>a-b)
    let result = [[]];//存放结果
    let count = 0;//记录从哪个位置开始添加元素
    let stemp = 0;//记录每次添加元素前的数组长度
    for(let i = 0;i<nums.length;i++){
        if(i>0 && nums[i]==nums[i-1]){
            count = stemp;
        }else{
            count = 0;
        }
        let length = result.length;
        stemp = length;
        for(let j = count;j<length;j++){
            result.push(result[j].concat(nums[i]));
        }
    }
    return result;
};
```

***

