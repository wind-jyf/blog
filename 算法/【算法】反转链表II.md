# 反转链表II

#### 一、题目详情

 反转从位置 *m* 到 *n* 的链表。请使用一趟扫描完成反转。 

 **说明:**
1 ≤ *m* ≤ *n* ≤ 链表长度。 

**示例:**

```javascript
输入: 1->2->3->4->5->NULL, m = 2, n = 4
输出: 1->4->3->2->5->NULL
```

#### 二、解题思路

大体思路其实就是根据上题的直接反转链表，利用头插法进行反转

1. 将链表分为三部分
2. 左部分和右部分顺序不变
3. 中间部分每次头插到右部分之前进行反转，此时右部分便和中间部分合为一体
4. 最后将左部分与右部分其连接起来

#### 三、代码实现

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} m
 * @param {number} n
 * @return {ListNode}
 */
var reverseBetween = function(head, m, n) {
    let nodeLeft = head;
    let nodeRight = head;
    let count = 1;
    let left;
    for(let i = 1;i<m-1;i++){
        nodeLeft = nodeLeft.next;//寻找左部分的最后一个节点
    }
    if(m==1){
        left = nodeLeft;//如果m=1，则中间的起始节点便等于左部分的最后节点
    }else{
        left = nodeLeft.next;//否则，就是左部分最后节点的后一个
    }
    for(let i =1;i<=n;i++){
        nodeRight = nodeRight.next;//寻找右部分的第一个节点
    }
    
    //经过下面操作之后，中间部分节点便和右节点合为一体
    for(let i =0;i<n-m+1;i++){
        let node = left.next;//需要将链表需要插入节点之后的节点存储一下
        left.next = nodeRight;//插入右部分节点之前
        nodeRight = left;//将插入位置前移
        left = node;//将需要插入的链表节点改变
    }
    if(m==1){
        return nodeRight;//如果m=1，左节点为空，直接返回右部分即可
    }else{
        nodeLeft.next = nodeRight;//将左部分和右部分连接
    }
    return head;
};
```

***

