- 拿到一个新 app 后的动作: 
```bash
$ npm update
$ npm i
$ npm audit fix
```

- 查看 README.md
- 查看 package.json 命令, 查看 script 命令
- 查看有哪些 dependency, 各个 dependency 有什么作用, 用在哪里

- 试运行整个 application（前端 + 后端）, 看有没有错误。
- 如果有数据库, 就安装对应数据库软件, 并建立自定义 本地 database, 连接 app 和 database。本例子使用的是 postgreSQL。（set up local database） 查看 knex ORM。

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

- 如果有 API key, 需要跟相关人员请求或者上网注册。

- clarify, 创建 clarity 账号, 然后创建新 API key, 复制黏贴到 `./controllers/image.js` 中。

- 使用 dotenv 保护 API KEY。
```bash
$ npm i dotenv
```

- 在 server.js 使用 dotenv
```js
require('dotenv').config();
```
- 新建一个新文件, 名字是 `.env`, 设定 API key, 注意不用加引号
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

- 使用变量, 并运行 application 查看使用。
```js
const app = new Clarifai.App({
  apiKey: process.env.API_KEY
});
```

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

- 上传至 github。


- 开始分析代码, 从整体上了解整个工作流程而不需要了解细节。
- 整个 application 分为 前端 app 和后端 app。


- 后端分析: 

package.json: 

```json
{
  "name": "node",
  "version": "1.0.0",
  "main": "script.js",
  "scripts": {
    "start": "nodemon server.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "bcrypt-nodejs": "0.0.3",
    "body-parser": "^1.18.2",
    "clarifai": "^2.5.0",
    "cors": "^2.8.4",
    "dotenv": "^8.2.0",
    "express": "^4.16.2",
    "knex": "^0.19.5",
    "pg": "^7.4.0"
  },
  "devDependencies": {
    "nodemon": "^1.12.7"
  },
  "description": ""
}
```

1. dependency: 
    - bcrypt-nodejs: 加密密码的库
    - body-parser: 一个HTTP请求体解析中间件, 使用这个模块可以解析JSON、Raw、文本、URL-encoded格式的请求体, Express框架中就是使用这个模块做为请求体解析中间件。
    - clarifai: 图像识别 API 对应的库
    - cors: 允许跨域
    - dotenv: 允许建立 .env
    - express: 服务器软件
    - knex: 数据库SQL查询构建器 (ORM)
    - pg: postgreSQL

2. 查看 `server.js`

    1. 可以查看后面的查看文件夹, `controllers`
    2. 这里使用 `knex` 连接了 db
    3. 这里使用了中间件
    4. 这里建立了 6条 route, 对应不同的 method
    5. 最后建立了 server, 端口为 3000.

3. 查看 `controllers` 文件夹

    1. image.js, 有两个函数: 
        - handleApiCall: 参数为 req, res,将 input 发送到 app, 并返回数据, 这个在 server.js 中对应 url 为 `/imageurl`.是一个对外查询函数。
        - handleImage: req,res, db 为参数, 将 req 的一些数据在 db 中查询, 并改变查询对象的一些数据, 这个在 server.js 中对应 url 为 `/image`.是一个对内查询并修改函数。

    2. profile.js, 有一个函数: 

        - handleProfileGet: req,res, db 为参数, 将 req 的一些数据在 db 中查询, 并返回对应用户的全部数据, 这个在 server.js 中对应 url 为 `/profile/:id`.是一个对内查询函数。

    3. register.js, 有一个函数: 

        - handleRegister: req, res, db, bcrypt 为参数, 先对 req 中一些数据进行判断, 将密码进行加密并储存在 database, 这个在 server.js 中对应 url 为 `/register`.是一个对内查询函数。

    4. signin.js, 有一个函数: 

        - handleSignin: db, bcrypt, req, res 为参数, 先查询 table login, 在其中找到对应的 email 并使用 bcrypt 核对密码, 如果吻合就返回用户, 这个在 server.js 中对应 url 为 `/signin`.是一个对内查询函数。

    5. 一共 6 条 route, 还有一条没有使用到 method, 这个会在后面提到。 

前段分析: 

package.json: 

```json
{
  "name": "facerecognitionbrain",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "react": "^16.2.0",
    "react-dom": "^16.2.0",
    "react-particles-js": "^2.1.0",
    "react-scripts": "^3.4.1",
    "react-tilt": "^0.1.4",
    "tachyons": "^4.9.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test --env=jsdom",
    "eject": "react-scripts eject"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

1. dependency: 
    - react: 
    - react-dom: 
    - react-particles-js:
    - react-scripts
    - react-tilt
    - tachyons

2. 查看 `src/index.js`

3. 查看 `App.js`(重点)

    - 这里有两个预设变量, 一个 particlesOptions, 暂时不知道作用, 一个是 initialState, 用来储存当前用户, 当前 route, 还有其他状态.

    - 使用 class component。

    - 函数 loadUser: 调用时把用户信息加入 state

    - 函数 calculateFaceLocation: 获取 data 之后, 对对应的图片进行计算。具体作用后补

    - 函数 displayFacebox: 改变 state

    - 函数 onInputChange: 检测输入, 然后用输入改变 state

    - 函数 onButtonSubmit: 利用 state 的信息, 激发一条 route: `http://localhost:3000/imageurl` 先把 state 里面的 url 传到 api, 得到回传之后整理, 接着激发另外一条 route `http://localhost:3000/image`, 对内 database 查询用户并修改信息, 最后调用函数 `calculateFaceLocation` 对图片进行计算, 得到的结果作为函数 `displayFaceBox` 的参数, 修改 state 中的 box 数据。

    - 函数 onRouteChange: 改变 state 的 route 信息, 同时加入 state 变量 isSignedIn 去判断用户是否已经登陆, 如果 isSignedIn 为 true, 则显示 route 为 home 的页面。

    - 函数 displayFacebox: 改变 state

    - 关于 render()
        - 它这里明显根据变量 state.isSignedIn 去决定显示的组件和传输的数据和函数。
        - 备注一个是: App 里面定义到函数都是用箭头定义的方式, 所以向下传递时如果被激发就会影响到 App 组建里面的 state。

3. 查看 `components` 文件夹

    1. Signin.js: 有 3 个函数, onEmailChange: 改变 state, onPasswordChange: 改变 state, 以上了条都是表格函数, onSubmitSignIn: 利用 state 的信息, 激发一条 route: `http://localhost:3000/signin`, 对内 database 查询用户并修改信息, 如果有用户就调用 loadUser 更改 APP 组件的用户信息, 然后使用onRouteChange 改变 App 组件的 route 信息。关于 render(), 这里的 onRouteChange 除了在 onRouteChange 中使用, 而且还在 render 里面使用, 语句是：
    ```jsx
    <p  onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
    ```

    - 函数链条：
        - component: Signin -> onEmailChange, onPasswordChange, onSubmitSignIn

        - onSubmitSignIn -> `http://localhost:3000/signin` -> loadUser + onRouteChange

    2. Register.js: 有 3 个函数, onNameChange, onEmailChange, onPasswordChange: 改变 state, 以上了条都是表格函数,onSubmitRegister: 利用 state 的信息, 激发一条 route: `http://localhost:3000/register`, 对内 database 创建新用户, 如果创建成功就调用 loadUser 更改 APP 组件的用户信息, 然后使用onRouteChange 改变 App 组件的 route 信息。

    - 函数链条：
        - component: Register -> onNameChange, onEmailChange, onPasswordChange, onSubmitRegister
        
        - onSubmitRegister -> `http://localhost:3000/register`-> loadUser + onRouteChange

    3. Logo.js, 无函数无参数组件。

    4. Rank.js, 无函数有两个来自 App.js 的参数: 
        ```jsx
        name={this.state.user.name}
        entries={this.state.user.entries}
        ```

    5. ImageLinkForm.js, 无参数有两个来自 App.js 的函数: 
        ```jsx
        onInputChange={this.onInputChange}
        onButtonSubmit={this.onButtonSubmit}
        ```

        - 这两个函数的主要作用是，一个是用来捕捉输入的 url，另外一个是用来向 API 发送请求。

    6. FaceRecognition.js, 无函数有两个来自 App.js 的参数: 
        ```jsx
        box={box}
        imageUrl={imageUrl}
        ```

        - 主要作用是 显示输入 url 对应的图片并绘画脸部边框。

    7. 一共 6 条 route, 还有一条没有使用到 method, 这个会在后面提到。


前后端函数对接：

1. onSubmitSignIn(Signin.js) -> `http://localhost:3000/signin` -> handleSignin(signin.js) -> loadUser + onRouteChange

2. onSubmitRegister -> `http://localhost:3000/register`->  handleRegister(register.js) -> loadUser + onRouteChange

3. onButtonSubmit -> `http://localhost:3000/imageurl` -> handleApiCall(image.js) -> `http://localhost:3000/image` -> handleImage(image.js)

4. 目前来看有两条 route 暂时还没有用到，分别是：

    ```js
    app.get('/', (req, res) => { res.send(db.users) });
    app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) });
    ```

    - 都是关于查询用户资料的 api，猜测作用应该是修改用户资料。