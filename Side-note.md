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

- 拿到一个新 app 后的动作：
```bash
$ npm update
$ npm i
$ npm audit fix
```

- 查看 README.md
- 查看 package.json 命令，查看 script 命令
- 查看有哪些 dependency，各个 dependency 有什么作用，用在哪里

- 试运行整个 application（前端 + 后端），看有没有错误。
- 如果有数据库，就安装对应数据库软件，并建立自定义 本地 database，连接 app 和 database。本例子使用的是 postgreSQL。（set up local database） 查看 knex ORM。

```diff
+ 1. run a postgre server
+ 2. create a database
+ 3. using a GUI to connect postgre server and the database (postico)
+ 4. create tables
```

创建一个新的 database
```bash
$ createdb 'smart-brain-local'
```

- 修改 knex 配置
```js
const db = knex({
  client: process.env.DB_CLIENT,
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: '',
    database: process.env.DB_NAME
  }
});
```

```sql
CREATE TABLE users(
    id serial PRIMARY KEY,
    name VARCHAR(100),
    email text UNIQUE NOT NULL,
    entries BIGINT DEFAULT 0,
    joined TIMESTAMP NOT NULL
)
```

```sql
CREATE TABLE login(
    id serial PRIMARY KEY,
    hash VARCHAR(100) NOT NULL,
    email text UNIQUE NOT NULL
)
```

- 如果有 API key，需要跟相关人员请求或者上网注册。

- clarify, 创建 clarity 账号，然后创建新 API key，复制黏贴到 `./controllers/image.js` 中。

- 使用 dotenv 保护 API KEY。
```bash
$ npm i dotenv
```

- 在 server.js 使用 dotenv
```js
require('dotenv').config();
```
- 新建一个新文件，名字是 `.env`，设定 API key，注意不用加引号
```js
API_KEY=adva892310230192y2jhbsdh

DB_HOST=10.10.10.1
DB_USER=TEST
DB_NAME=my-database
DB_CLIENT=pg
```

- 在 `.gitignore` 文件中加入屏蔽列表
```js
/node_modules

*.env
```

- 使用变量，并运行 application 查看使用。
```js
const app = new Clarifai.App({
  apiKey: process.env.API_KEY
});
```

- 上传至 github。


- 开始分析代码，从整体上了解整个工作流程而不需要了解细节。
- 整个 application 分为 前端 app 和后端 app。