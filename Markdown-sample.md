# Web development tools (Part 11)

- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)

## `Section: Performance`(Performance-Part2.2)

### `Summary`: In this documentation, we improve website performance by optimizing React performance.

### `Check Dependencies & Tools:`

- 

------------------------------------------------------------

#### `本章背景：`
- React 的工作原理是 state 或者 props 变化就全部重加载 `rerender`，但是有时候的实际使用情况是有些部件不需要跟着重加载，这时候就需要一些优化或设定提高 React 的效率。

<p align="center">
<img src="../assets/p11-1.png" width=90%>
</p>

------------------------------------------------------------

### <span id="11.0">`Brief Contents & codes position`</span>

- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)

- [11.1 Optimize target project.](#11.1)
- [11.2 Solution1: Import file when is needed and put it into state.](#11.2)
- [11.3 Solution2: Using high order function to generate async Component.](#11.3)
- [11.4 Solution3: React new feature - React.lazy](#11.4)

------------------------------------------------------------



### <span id="11.1">`Step1: Optimize target project`</span>

- #### Click here: [BACK TO CONTENT](#11.0)

- __`Location: ./example1/code-splitting/src/edition1/Page1.js`__

```js

```

- __`Result`__:

<p align="center">
<img src="../assets/p11-2.png" width=90%>
</p>

----------------------------------------------------------------------------

#### `Comment:`
1. 




### <span id="11.2">`Step2: Solution1: Import file when is needed and put it into state.`</span>

- #### Click here: [BACK TO CONTENT](#11.0)

- __`Location: ./example1/code-splitting/editon2/App.js`__

```js

```

- __`Result`__:

<p align="center">
<img src="../assets/p11-3.png" width=90%>
</p>

----------------------------------------------------------------------------


#### `Comment:`
1. 



### <span id="11.3">`Step3: Solution2: Using high order function to generate async Component.`</span>

- #### Click here: [BACK TO CONTENT](#11.0)

- __`Location: ./example1/code-splitting/edition2/AsyncComponent.js`__

```js

```

- __`Result`__:

<p align="center">
<img src="../assets/p11-6.png" width=90%>
</p>

----------------------------------------------------------------------------

#### `Comment:`
1. 



### <span id="11.4">`Step4: Solution3: React new feature - React.lazy.`</span>

- #### Click here: [BACK TO CONTENT](#11.0)

- __`Location: ./example1/code-splitting/edtion3/App.js`__

```js

```
- __`Result`__:

<p align="center">
<img src="../assets/p11-9.png" width=90%>
</p>

----------------------------------------------------------------------------


#### `Comment:`
1. 

- #### Click here: [BACK TO CONTENT](#11.0)
- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)



