# Web development tools (Part 17)

- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)

## `Section: TypeScript` (Part 2: Application)

### `Summary`: In this documentation, we learn combing App with TypeScript.

### `Check Dependencies & Tools:`

- typescript

------------------------------------------------------------

#### `本章背景：`
- __参考材料 ：[Adding TypeScript to CRA](https://create-react-app.dev/docs/adding-typescript)__

- 本节中用到的 demo app 是 `robotfriends-typescript`

- TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.

- 本章分两部分，分别是：
    1. Basic 
    2. App :white_check_mark:

------------------------------------------------------------

### <span id="17.0">`Brief Contents & codes position`</span>

- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)

- [17.1 Adding TypeScript to CRA.](#17.1)
- [17.2 Adding TypeScript to an existing app.](#17.2)
- [17.3 Basic data types.](#17.3)
- [17.4 Advanced data types.](#17.4)

------------------------------------------------------------

### <span id="17.1">`Step1: Adding TypeScript to CRA.`</span>

- #### Click here: [BACK TO CONTENT](#17.0)

1. Update the npx

```bash
$ npm uninstall -g create-react-app
$ npm install -g create-react-app
```

2. To start a new Create React App project with TypeScript:

```bash
$ npx create-react-app my-app --template typescript
```
----------------------------------------------------------------------------

3. To add TypeScript to a Create React App project

```bash
$ npm install --save typescript @types/node @types/react @types/react-dom @types/jest
```

----------------------------------------------------------------------------

- Next, `rename any file to be a TypeScript file (e.g. src/index.js to src/index.tsx)` and restart your development server!


#### `Comment:`
1. `Benifits:` __Type errors will show up in the same console as the build one. You'll have to fix these type errors before you continue development or build your project.__


### <span id="17.2">`Step2: Adding TypeScript to an existing app.`</span>

- #### Click here: [BACK TO CONTENT](#17.0)

#### `Comment:`
1. 从上可知，TypeScript 的作用是在 ts 文件中先对一些变量进行数据类型设定，然后再执行编译程序转化成 js 文件。

2. 在这里提一个问题，编译好的 js 文件没有对 ts 中设定的数据类型敏感，所以 TypeScript 在这里的作用是什么，作为编译前的检测器，对编译行为进行规范并减少 bugs？


### <span id="17.3">`Step3: Basic data types.`</span>

- #### Click here: [BACK TO CONTENT](#17.0)

1. Preset:



----------------------------------------------------------------------------

#### `Comment:`
1. 


#### `Comment:`
1. 

- __参考材料 ：[https://www.typescriptlang.org/](https://www.typescriptlang.org/)__

- #### Click here: [BACK TO CONTENT](#17.0)
- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)