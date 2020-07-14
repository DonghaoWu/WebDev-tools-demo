# Web development tools (Part 20)

- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)

## `Section: Code analysis.` (Basic)

### `Summary`: In this documentation, we learn to how to do code analysis to a new application.

### `Check Dependencies & Tools:`

- dotenv

------------------------------------------------------------

#### `本章背景：`
- 本章使用的 demo app 分两个，一个是前端 app，一个是后端 app。

------------------------------------------------------------

### <span id="20.0">`Brief Contents & codes position`</span>

- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)

- [20.1 Check documentations and install dependencies.](#20.1)
- [20.2 Setup database server, create database and table.](#20.2)
- [20.3 Setup API key and .env file.](#20.3)
- [20.4 Backend application.](#20.4)
- [20.5 Frontend application.](#20.5)
- [20.6 Data flow.](#20.6)
- [20.7 Others.](#20.)

------------------------------------------------------------

### <span id="20.1">`Step1: Check documentations and install dependencies.`</span>

- #### Click here: [BACK TO CONTENT](#20.0)

1. Frontend documentation:

    __`Location:./demo-apps/frontend-smart-brain/README.md`__

    ```md
    # SmartBrain - v2
    Final project for Udemy course

    1. Clone this repo
    2. Run `npm install`
    3. Run `npm start`
    ```

2. Frontend package.json:

    __`Location:./demo-apps/frontend-smart-brain/package.json`__

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

3. Backend documentation:

    __`Location:./demo-apps/backend-smart-brain-api/README.md`__

    ```md
    # SmartBrain-api - v2
    Final project for Udemy course

    1. Clone this repo
    2. Run `npm install`
    3. Run `npm start`
    4. You must add your own API key in the `controllers/image.js` file to connect to Clarifai API.

    You can grab Clarifai API key [here](https://www.clarifai.com/)

    ** Make sure you use postgreSQL instead of mySQL for this code base.
    ```

4. Backend package.json:

    __`Location:./demo-apps/backend-smart-brain-api/package.json`__

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

5. Install depenencies.

    ```bash
    $ npm update
    $ npm i
    $ npm audit fix
    ```

#### `Comment:`
1. 


### <span id="20.2">`Step2: Setup database server, create database and table.`</span>

- #### Click here: [BACK TO CONTENT](#20.0)

1. Install postgreSQL:
    - [MAC postgreSQL installation](https://postgresapp.com/)

2. Create a new database in postgreSQL:

    ```bash
    $ createdb 'smart-brain-local'
    ```

3. Install a GUI to connect and manage database.

    - [Postico](https://eggerapps.at/postico/)

4. Create two new tables in the database.

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

<p align="center">
<img src="../assets/p20-01.png" width=90%>
</p>

------------------------------------------------------------

5. Connect backend application and the new database.

    __`Location:./demo-apps/backend-smart-brain-api/server.js`__

    ```js
    const db = knex({
        client: 'pg',
        connection: {
            host: 127.0.0.1,
            user: <Your postgreSQL username>,
            password: '',
            database: 'smart-brain-local'
        }
    });
    ```

#### `Comment:`
1. 

### <span id="20.3">`Step3: Setup API key and .env file.`</span>

- #### Click here: [BACK TO CONTENT](#20.0)

1. Register a new account in [clarifai.com](https://www.clarifai.com/).

2. Copy your API key.

<p align="center">
<img src="../assets/p20-02.png" width=90%>
</p>

------------------------------------------------------------

3. Install dotenv dependency in backend application.

    ```bash
    $ npm i dotenv
    ```

4. Apply the dependency in the first line of the file.

    __`Location:./demo-apps/backend-smart-brain-api/server.js`__

    ```js
    require('dotenv').config();
    ```

5. Create a new file in root directory, name it `.env`, then put all private data here.

    __`Location:./demo-apps/backend-smart-brain-api/.env`__

    ```js
    API_KEY=adva892310230192y2jhbsdh

    DB_HOST=10.10.10.1
    DB_USER=TEST
    DB_NAME=my-database
    DB_CLIENT=pg
    ```

6. Replace the variables.

    __`Location:./demo-apps/backend-smart-brain-api/server.js`__

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

    __`Location:./demo-apps/backend-smart-brain-api/controllers/image.js`__

    ```js
    const Clarifai = require('clarifai');

    //You must add your own API key here from Clarifai.

    const app = new Clarifai.App({
        apiKey: process.env.API_KEY
    });
    ```

7. Add code in `.gitignore`.

    __`Location:./demo-apps/backend-smart-brain-api/.gitignore`__

    ```js
    /node_modules

    *.env
    ```

8. Run both frontend app and backend app.
    ```bash
    $ npm start
    ```

9. Check the `register` and `signin` feature.

<p align="center">
<img src="../assets/p20-03.png" width=90%>
</p>

------------------------------------------------------------

<p align="center">
<img src="../assets/p20-04.png" width=90%>
</p>

------------------------------------------------------------

<p align="center">
<img src="../assets/p20-05.png" width=90%>
</p>

------------------------------------------------------------

<p align="center">
<img src="../assets/p20-06.png" width=90%>
</p>

------------------------------------------------------------

#### `Comment:`
1. :star: 这里需要提一下 register 函数是跟两个 table 都有互动的。

### <span id="20.4">`Step4: Back end application.`</span>

- #### Click here: [BACK TO CONTENT](#20.0)

1. Dependencies:
    - bcrypt-nodejs: 加密密码的库
    - body-parser: 一个HTTP请求体解析中间件, 使用这个模块可以解析JSON、Raw、文本、URL-encoded格式的请求体, Express框架中就是使用这个模块做为请求体解析中间件。
    - clarifai: 图像识别 API 对应的库
    - cors: 允许跨域
    - dotenv: 允许建立 .env
    - express: 服务器软件
    - knex: 数据库SQL查询构建器 (ORM)
    - pg: postgreSQL

2. 查看 `server.js`

    __`Location:./demo-apps/backend-smart-brain-api/server.js`__

    1. 可以查看后面的查看文件夹, `controllers`
    2. 这里使用 `knex` 连接了 db
    3. 这里使用了中间件
    4. 这里建立了 6条 route, 对应不同的 method。
    5. 最后建立了 server, 端口为 3000.

    ```js
    app.get('/', (req, res) => { res.send(db.users) })
    app.post('/signin', signin.handleSignin(db, bcrypt))
    app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
    app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })
    app.put('/image', (req, res) => { image.handleImage(req, res, db) })
    app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })
    ```

3. 查看 `controllers` 文件夹

    __`Location:./demo-apps/backend-smart-brain-api/controllers`__

    1. image.js, 两个函数: 

        - `handleApiCall`: req, res 为参数, 将 input 发送到 app, 并返回数据, 这个在 server.js 中对应 url 为 `/imageurl`.是一个对外查询 API 函数。

        - `handleImage`: req, res, db 为参数, 将 req 的一些数据在 db 中查询, 并改变查询对象的一些数据, 这个在 server.js 中对应 url 为 `/image`.是一个对内查询并修改 database 函数。

    2. profile.js, 一个函数: 

        - `handleProfileGet`: req,res, db 为参数, 将 req 的一些数据在 db 中查询, 并返回对应用户的全部数据, 这个在 server.js 中对应 url 为 `/profile/:id`.是一个对内查询 database 函数。

    3. register.js, 一个函数: 

        - `handleRegister`: req, res, db, bcrypt 为参数, 先对 req 中一些数据进行判断, 将密码进行加密并储存在 database, 这个在 server.js 中对应 url 为 `/register`.是一个对内查询 database 函数。

    4. signin.js, 一个函数: 

        - `handleSignin`: db, bcrypt, req, res 为参数, 先查询 table login, 在其中找到对应的 email 并使用 bcrypt 核对密码, 如果吻合就返回用户, 这个在 server.js 中对应 url 为 `/signin`.是一个对内查询 database 函数。

    5. 一共 6 条 route, 还有一条没有使用到 method, 这个会在后面提到。 

#### `Comment:`
1. 

### <span id="20.5">`Step5: Front end application.`</span>

- #### Click here: [BACK TO CONTENT](#20.0)

1. dependency: 
    - react: 
    - react-dom: 
    - react-particles-js:
    - react-scripts
    - react-tilt
    - tachyons

2. 查看 `src/index.js`

    __`Location:./demo-apps/frontend-smart-brain/src/index.js`__

3. 查看 `App.js`(重点):

    __`Location:./demo-apps/frontend-smart-brain/src/App.js`__

    - 这里有两个预设变量, 一个 particlesOptions, 暂时不知道作用, 一个是 initialState, 用来初始化清零数据，应用场景为第一次加载或者用户退出登录时清空 state 信息。

    - 使用 `class component`。

    - 函数 `loadUser`: 调用时把用户信息加入 state

    - 函数 `calculateFaceLocation`: 获取 data 之后, 对对应的图片进行计算。

    - 函数 `displayFacebox`: 改变 state 里面的 box 信息，配合函数 calculateFaceLocation 使用。

    - 函数 `onInputChange`: 检测输入, 然后用输入改变 state

    - 函数 `onButtonSubmit`: 利用 state 的信息, 激发一条 route: `http://localhost:3000/imageurl` 先把 state 里面的 url 传到 api, 得到回传之后整理, 接着激发另外一条 route `http://localhost:3000/image`, 对内 database 查询用户并修改信息, 最后调用函数 `calculateFaceLocation` 对图片进行计算, 得到的结果作为函数 `displayFaceBox` 的参数, 修改 state 中的 box 数据。

    - 函数 `onRouteChange`: 改变 state 的 route 信息, 同时加入 state 变量 isSignedIn 去判断用户是否已经登陆, 如果 isSignedIn 为 true, 则显示 route 为 home 的页面。

    - 关于 render()
        - 它根据变量 state.isSignedIn 去决定显示的组件和传输的数据和函数，`这里设定没有 router`，效果是显示的都是同一个 url，但根据 `state.isSignedIn` 显示不同的组件群。
        - 备注一个是: App 里面定义到函数都是用箭头定义的方式, 所以向下传递时如果被激发就会影响到 App 组建里面的 state。

4. 查看 `components` 文件夹

    __`Location:./demo-apps/frontend-smart-brain/src/components`__

    1. `Signin.js`: 3 个函数, 

    - `onEmailChange`: 改变 state, onPasswordChange: 改变 state, 以上了条都是表格函数, 
    
    - `onSubmitSignIn`: 利用 state 的信息, 激发一条 route: `http://localhost:3000/signin`, 对内 database 查询用户并修改信息, 如果有用户就调用 loadUser 更改 APP 组件的用户信息, 然后使用onRouteChange 改变 App 组件的 route 信息。关于 render(), 这里的 onRouteChange 除了在 onRouteChange 中使用, 而且还在 render 里面使用, 语句是：

    ```jsx
    <p  onClick={() => onRouteChange('register')} className="f6 link dim black db pointer">Register</p>
    ```

    - component & functions
        - component: Signin -> onEmailChange, onPasswordChange, onSubmitSignIn

        - onSubmitSignIn -> `http://localhost:3000/signin` -> loadUser + onRouteChange

    2. Register.js: 3 个函数
    - onNameChange, onEmailChange, onPasswordChange: 改变 state, 以上了条都是表格函数
    
    - onSubmitRegister: 利用 state 的信息, 激发一条 route: `http://localhost:3000/register`, 对内 database 创建新用户, 如果创建成功就调用 loadUser 更改 APP 组件的用户信息, 然后使用onRouteChange 改变 App 组件的 route 信息。

    - component & functions
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

        - 这两个函数的主要作用是，一个是用来捕捉输入的 url 并更发改 App.js 中的 state，另外一个是用来向 API 发送请求。

    6. FaceRecognition.js, 无函数有两个来自 App.js 的参数: 

        ```jsx
        box={box}
        imageUrl={imageUrl}
        ```

        - 主要作用是 显示输入 url 对应的图片并绘画脸部边框。

5. 目前来看有两条 route 暂时还没有用到，分别是：

    ```js
    app.get('/', (req, res) => { res.send(db.users) });
    app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) });
    ```

    - 都是关于查询用户资料的 api，猜测作用应该是修改用户资料。

#### `Comment:`
1. 

### <span id="20.6">`Step6: Data flow.`</span>

- #### Click here: [BACK TO CONTENT](#20.0)

- 前后端函数对接：

1. onSubmitSignIn(Signin.js) -> `http://localhost:3000/signin` -> handleSignin(signin.js) -> loadUser + onRouteChange (App.js)

2. onSubmitRegister(Register.js) -> `http://localhost:3000/register`->  handleRegister(register.js) -> loadUser + onRouteChange (App.js)

3. onButtonSubmit(ImageLinkForm.js) -> `http://localhost:3000/imageurl` -> handleApiCall(image.js) -> `http://localhost:3000/image` -> handleImage(image.js)

### <span id="20.1">`Step7: Others.`</span>

- #### Click here: [BACK TO CONTENT](#20.0)

1. 本应用最值得学习代码：

- :star::star::star: 连续 promise。
```js
  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
      fetch('http://localhost:3000/imageurl', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })
            .catch(console.log)

        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }
```

- :star::star::star:无 router 设计:

```js
  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
         <Particles className='particles'
          params={particlesOptions}
        />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
        { route === 'home'
          ? <div>
              <Logo />
              <Rank
                name={this.state.user.name}
                entries={this.state.user.entries}
              />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition box={box} imageUrl={imageUrl} />
            </div>
          : (
             route === 'signin'
             ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
             : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )
        }
      </div>
    );
  }
```

- #### Click here: [BACK TO CONTENT](#20.0)
- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)