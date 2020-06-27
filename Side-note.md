1. 复制别人的 repo 放在自己的 repo 中作为例子：

```bash
$ git clone ... # gitHub link
$ cd ...# directory name
$ rm -fr .git
$ git add .
$ git commit -m'...'
$ git push
```

2. Arrow function 的省略写法：

```js
// 以下两个写法是一样的。
export const apiCall = (link) =>
  fetch(link).then(response => response.json())

export const apiCall = (link) => {
  fetch(link).then(
    response => {
      return response.json();
    })
}

// 还有
let elements = [
  'Hydrogen',
  'Helium',
  'Lithium',
  'Beryllium'
];

elements.map(function(element) { 
  return element.length; 
}); // 返回数组：[8, 6, 7, 9]

// 上面的普通函数可以改写成如下的箭头函数
elements.map((element) => {
  return element.length;
}); // [8, 6, 7, 9]

// 当箭头函数只有一个参数时，可以省略参数的圆括号
elements.map(element => {
 return element.length;
}); // [8, 6, 7, 9]

// 当箭头函数的函数体只有一个 `return` 语句时，可以省略 `return` 关键字和方法体的花括号
elements.map(element => element.length); // [8, 6, 7, 9]
```

3. 一种默认的条件：在写 async testing 时，发现在请求体中 body 键对应的值（通常是一个 object 或者其他类型数据），在接受时就是 data，即 `response.json()` 这个方法直接把 body 值取出来：
```js
export const apiCall = (link) =>
  fetch(link).then(response => response.json())
  .then(data =>{
      dispatch({type:..., payload: data})
  })
```

4. 6/27/2020，目前发现以下两个语句在测试过程中不一样，后面解释:
```js
response => response.json()
```
```js
response =>{
  return response.json()
}
```