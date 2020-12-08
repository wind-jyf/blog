/*
 * @Author: 江羽凤
 * @Date: 2020-12-08 19:36:07
 * @LastEditTime: 2020-12-08 19:45:37
 * @LastEditors: 江羽凤
 * @Description: 
 * @FilePath: \CSSh:\面试准备\Vue\vnode.js
 */
const createVNode = (tag) =>{
    return{
        tag,
        children:[]
    }
}
const createText = (text) =>{
    text = text.wholeText.trim();
    return {
        tag:'TEXT',
        text
    }
}
const htmlToJSON = (root) =>{
    const vnode = createVNode(root.tagName);
    root.childNodes && [...root.childNodes].forEach((child)=>{
        switch(child.nodeType){
            case 1:vnode.children.push(htmlToJSON(child));break;
            case 3:child.wholeText.trim() && vnode.children.push(createText(child));break;
        }
    })
    return vnode;
}

const jsonToHTML = (root)=>{
    let node;
    const createText = ()=>{
        node = document.createTextNode(root.text);
    }
    const createEl = ()=>{
        node = document.createElement(root.tag);
        root.children && root.children.forEach((child)=>{
            node.appendChild(jsonToHTML(child));
        })
    }
    root.tag === "TEXT"?createText():createEl();
    return node;
}
