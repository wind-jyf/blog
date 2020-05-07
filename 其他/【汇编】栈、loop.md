内存段的安全 

数据段 代码段 栈段

随意地向某一段内存空间中写入内容是非常危险的



向安全的内存空间去写入内容

0:200~0:2FFH

256个字节



在操作系统的环境中，合法地通过操作系统所取得的内存空间都是安全的

操作系统就是干管理内存的作用的

取得空间的方法：

一种是系统加载程序时因为程序分配的内存空间

一种是程序在执行的过程中 向系统再去申请内容（不用）



伪指令（告诉编译器，也就是翻译软件，这里怎么翻译，那里怎么翻译）：

data segment

stack segment

code segment



编译 nasm asm->obj

链接 link   obj->exe



start 伪指令 是告诉翻译软件    start伪指令在exe文件的描述信息中扮演什么的角色？

就是将我们设置的程序入口地址在哪里 记录在exe文件的描述信息中

然后系统通过这个描述文件的内容去设置 CS:IP,当然还有一些其他内容



最后两行程序是返回的功能

系统在加载程序的时候给程序分配内存 设置寄存器

内存和寄存器在程序结束后都需要还给系统，否则就永远占用了内存，内存是有限的，直到最终，系统没有内存。

CX等于程序的长度

用p执行int指令



loop指令两个步骤：

1. CX=CX-1
2. 判断CX中的值，不为0则跳转到标号位置继续执行，等于0 则执行下面的指令。

DS：数据从哪里来

ES：数据到哪里去





一点自己的小感悟：

计算机如何区 分指令，它将cs:ip指向的内存单元当做指令

但CS寄存器同时拥有自己的内存单元，CS:[BX]发生变化，不代表CS所指向的位置发生了变化。



[bx+数字]形式访问内存

可以省略寄存器的使用

[bx+si],[bx+di]



word ptr

byte ptr



div指令    除法指令

除数：有8位和16位两种，在一个寄存器或内存单元中

被除数：默认放在AX 或者AX和DX中，

如果除数为8位，被除数则为16位，默认放在AX中

如果除数为16位，被除数则为32位，DX存放高16位，AX存放低16位



结果：如果除数8位，则AL存储除法操作的商，AH存储除法操作的余数

如果除数为16位，则AX存储除法的商，DX存储除法操作的余数



dd伪指令  32位

dw             16位

db               8位



dup伪指令

dd  100 dup(1),代表重复100次字节型数据1

dw  100 dup(1),代表重复100次字型数据1



mov ax,[bp]，bp的默认段地址是ss



mov ax,ds:[bx]

mov ax,ds:[si]

mov ax,ds:[di]

mov ax,ds:[bp]

mov ax,ds:[bx+si]

mov ax,ds:[bx+di]

mov ax,ds:[bp+si]

mov ax,ds:[bp+di]

mov ax,ds:[bx+si+5]



转移指令原理：

1. 可以修改ip
2. 同时修改CS和IP

jmp   无条件指令

Jmp跳转指令编译后的机器码和指令的长度有关 其实就是指令的长度

通过这种方式 CPU在执行jmp指令的时候不需要跳转的目的地就可以实现对IP寄存器的修改

只需要做一个加法就可以了

标号地址-jmp指令后的第一个自己的地址=机器码所表示的指令长度

loop   条件指令

call



操作符      OFFSET     可获取偏移地址

jcxz条件转移指令：

1. 当CX寄存器中的值=0时2进行jmp
2. 和loop恰好相反



jmp dword ptr ds:[0]             IP=ds:[0]的字型数据 CS=ds:[2]的字型数据





在屏幕中间显示不同颜色的字符

偶数地址   存放字符的ASCII码

奇数地址   存放字符的颜色



88个字符

25行



jmp 标号

jmp short 标号

jmp near  标号





call

ret



ret

retf

内存中的字型数据

当执行ret指令时 相当于执行 pop ip

当执行retf指令时 相当于执行了 pop IP   pop CS



call指令：

1. push ip
2. jmp near ptr 标号

call far ptr 标号：

1. push CS
2. push IP
3. jmp far ptr 标号

call 16位寄存器

1. push IP
2. jmp 16位寄存器          此时的IP跳转到16位寄存器中的字型数据   

call word ptr 内存单元地址

1. push IP
2. jmp word ptr 内存单元地址

call dword ptr 内存单元地址

1. push CS
2. push IP
3. jmp dword ptr 内存单元地址      此时的ip=ds:[0],cs=ds[2]





实验一的第四题

```asm

data segment
	db 00010010b
data ends
STACKS SEGMENT
    db 128 dup(0)
STACKS ENDS

CODES SEGMENT
    ASSUME CS:CODES,SS:STACKS
START:
	mov ax,stacks
	mov ss,ax
	mov sp,128   ;设置栈
	
	call init
	
	call input
	sub al,30h
	mov dl,al
	
	call input
	sub al,30h
	mov dh,al
	
	call sum
	
	call show
	
	MOV AH,4CH
    INT 21H
    
;------------------------------
show:
	mov dh,ds:[0]
	add al,30h
	mov dl,al
	mov es:[di],dx
	
	add di,2
	mov al,ah
	mov ah,0h
	mov bl,30H
	div bl
	add ah,30h
	mov dl,ah
	mov es:[di],dx
	
	ret
	
;------------------------------ 
sum:
	add dl,dh
	add dl,30h
	mov ah,0h
	mov al,dl
	mov bl,3Ah
	div bl
	
	ret
	
;------------------------------  
input:
	mov ah,1h
	int 21h
	
	ret
;------------------------------  
init:
	mov bx,data
	mov ds,bx
	
	mov bx,0B800H
	mov es,bx
	mov di,160*5+16*2
	
    ret
;------------------------------  
    
CODES ENDS
    END START


```

