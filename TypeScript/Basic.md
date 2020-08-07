# Web development tools (Part 16)

### `Key Word: TypeScript configuration, data types.`

- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)

## `Section: TypeScript` (Part 1: Basic)

### `Summary`: In this documentation, we learn basic TypeScript.

### `Check Dependencies & Tools:`

- typescript

------------------------------------------------------------

#### `本章背景：`
- __参考材料 ：[https://www.typescriptlang.org/](https://www.typescriptlang.org/)__

- TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.

- 本章分两部分，分别是：
    1. Basic :white_check_mark:
    2. App

------------------------------------------------------------

### <span id="16.0">`Brief Contents & codes position`</span>

- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)

- [16.1 Install dependency and configure.](#16.1)
- [16.2 Compile a ts file.](#16.2)
- [16.3 Basic data types.](#16.3)
- [16.4 Advanced data types.](#16.4)

------------------------------------------------------------

### <span id="16.1">`Step1: Install dependency and configure.`</span>

- #### Click here: [BACK TO CONTENT](#16.0)

1. Install dependency.

```bash
$ node -v  # check node version
$ sudo npm i -g typescript
$ tsc # check if installed correctly
```
----------------------------------------------------------------------------

#### `Comment:`
1. 


### <span id="16.2">`Step2: Compile a ts file.`</span>

- #### Click here: [BACK TO CONTENT](#16.0)

1. Simple function in ts file

    __`Location: ./demo-apps/basic/ty-demo.ts`__

```js
export { };

const func1 = (a: number, b: number) => {
    return a + b;
}

console.log(func1(1, 2));
```

----------------------------------------------------------------------------

2. Compile the ts file.

```bash
$ tsc ty-demo.ts
```

3. Get a new js file in the same directory.

    __`Location: ./demo-apps/basic/ty-demo.js`__

```js
"use strict";
exports.__esModule = true;
var func1 = function (a, b) {
    return a + b;
};
console.log(func1(1, 2));
```

4. Configuration, get a new file: tsconfig.json

```bash
$ tsc --init
```

- __`Location: ./demo-apps/basic/tsconfig.json`__

- 在 compilerOptions 可以修改设置。

5. 自动侦查修改并编译模式：

```bash
$ tsc ty-demo.ts --watch
```

#### `Comment:`
1. 从上可知，TypeScript 的作用是在 ts 文件中先对一些变量进行数据类型设定，然后再执行编译程序转化成 js 文件。

2. 在这里提一个问题，编译好的 js 文件没有对 ts 中设定的数据类型敏感，所以 TypeScript 在这里的作用是什么，作为编译前的检测器，对编译行为进行规范并减少 bugs？


### <span id="16.3">`Step3: Basic data types.`</span>

- #### Click here: [BACK TO CONTENT](#16.0)

1. Basic types.
     __`Location: ./demo-apps/basic/ty-demo.ts`__
```js
// boolean
let isCool: boolean = true;

// string
let color: string = 'black';

// array
let pets: string[] = ['cat', 'dog', 'pig'];
let foods: Array<string> = ['apple', 'bread', 'noodle'];

// object
let wizard: object = {
    a: 'John'
}

// undefined & null
let med: undefined = undefined;
let noo: null = null;
```
----------------------------------------------------------------------------

#### `Comment:`
1. 


### <span id="16.4">`Step4: Advanced data types.`</span>

- #### Click here: [BACK TO CONTENT](#16.0)

1. Advanced types.
     __`Location: ./demo-apps/basic/ty-demo.ts`__

```js
// tuple
let basket: [string, string];
basket = ['pet', 'food'];

// enum
enum size { Small = 1, Medium = 2, Large = 3 };
let sizeName: string = size[2];
let sizeNum: number = size.Small;

// any
let whatever: any = 'ahhhh';
whatever = 5;

// function without return & end point: never
const error = (): never => {
    throw Error('oooops!');
}

// function only without return
const sing = (): void => {
    console.log('ha');
}

// interface
interface RobotArmy {
    count: number,
    type: string,
    magic: string
}

let fightRobotArmy1 = (robots: RobotArmy) => {
    console.log('Robot1');
}

let fightRobotArmy2 = (robots: { count: number, type: string, magic: string }) => {
    console.log('Robot2');
}

// type，相当于 interface
type CatArmy = {
    count: number,
    type: string,
    magic: string
}

let fightCatArmy1 = (robots: CatArmy) => {
    console.log('Cat1');
}

let fightCatArmy2 = (robots: { count: number, type: string, magic: string }) => {
    console.log('Cat2');
}

// omit if statement，表示该键值可有可无。
type DogArmy = {
    count: number,
    type: string,
    magic?: string
}

// function
const func2 = (): number => {
    return 5;
}

// class
class Animal {
    private sing: string = 'lalala';
    constructor(sound: string) {
        this.sing = sound;
    }
    greet() {
        return `Hello ${this.sing}`;
    }
}

let lion = new Animal('Rawwwwww');
console.log(lion.greet());

// Union
let confused: string | number | boolean = true;

// 默认模式，相当于 const 的作用。
let x = 4;
// x = 'hello' 
```

#### `Comment:`
1. 

- __参考材料 ：[https://www.typescriptlang.org/](https://www.typescriptlang.org/)__

- #### Click here: [BACK TO CONTENT](#16.0)
- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)