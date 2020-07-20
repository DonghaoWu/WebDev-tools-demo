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

5. 对 React 定义函数区域的重新认识，render 内外都可以定义 function，但 render 外定义的是 instance 属性 function，可以传递。 render 内定义的不能传递。如：

- 7/2/2020 修正，如下例子 render 外可以定义函数， render 一般内不定义函数，主要负责调用函数。

```js
import * as React from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';

export interface IRobot {
  name: string;
  id: number;
  email: string;
}

interface IAppProps {
}

interface IAppState {
  robots: Array<IRobot>;
  searchfield: string;
}

class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props)
    this.state = {
      robots: [],
      searchfield: ''
    }
  }

  componentDidMount(): void {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => { this.setState({ robots: users }) });
  }

  onSearchChange = (event: React.SyntheticEvent<HTMLInputElement>): void => {
    this.setState({ searchfield: event.currentTarget.value })
  }

  render(): JSX.Element {
    const { robots, searchfield } = this.state;
    const filteredRobots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    })
    return !robots.length ?
      <h1>Loading</h1> :
      (
        <div className='tc'>
          <h1 className='f1'>RoboFriends</h1>
          <SearchBox searchChange={this.onSearchChange} />
          <Scroll>
            <CardList robots={filteredRobots} />
          </Scroll>
        </div>
      );
  }
}

export default App;
```

6. 关于 nextJS，动态 URL 的参数对应的页面设置比较特别，比如
```diff
+ /robots/id

+ 对应就要在 pages 文件夹下新建一个文件夹，名字是 robots，然后 robots 下新建一个新文件，叫做 [id].js

+ 在 [id].js 中获取参数的方法也不一样，需要 

+ import { useRouter } from 'next/router';
+ const id = useRouter().query.id
```

7. 如果你从本地一个文件夹（假设为 App-A）下面的一个 project（假设为 project-A）复制到另外一个本地文件夹（假设为 App-B），当运行 project-A 的时候（npm start）可能会有以下错误发生而不能运行：

<p align="center">
<img src="./assets/sn-01.png" width=85%>
</p>

- 解决尝试：
  1. 删除文件夹 node_modules，然后重新运行命令 `npm install`
  2. 个人估计这个原因是原始的 project 在 node_modules 在安装的时候有特定的 path 设定，所以直接复制过来的话会有些设定按原路径是无法找到的。
  3. :boom: 需要注意的是，如果不删除 node_modules 而运行 `npm install`，在执行安装的过程中会报错，而且`npm start`照样不会成功。

----------------------------------------------------------------------------