dockerhub

download images

write your own dockerfile

install docker

create a new file name dockerfile

`docker build -t <container-name> .`--> 生成一个镜像，按照 dockerfile 里面的配置下载需要的软件和配置环境。

`docker run -it <my-container>` --> 进入 container ，至于进入什么命令行，要看 dockerfile 的配置。__注意命令中 -it 不能缺少__，这个除了进入之外同时在运行 docker container。

`node -v` 在 container 内查看当前 node 的版本。
`exit` 退出当前 container


`docker run -it -d <my-container>`--> 这个命令使 container 运行，同时不进入 container

`docker ps` --> 查看当前正在运行的 container 数据。


`docker exec -it <containerID> bash`: 当 docker 隐性运行时需要进入指定的运行 container。

`docker stop <containerID> `: 当 docker 隐性运行时停止 container。

```dockerfile
# environment
FROM node:12.18.2 

# 路径，设定复制的文件夹粘贴位置，在每一个 container，都会有预设的文件架构，在这里把源代码文件放到 /usr/src 下面一个自命名为 smart-brain-api 的文件夹之下。
WORKDIR /usr/src/smart-brain-api

# 复制动作，注意，第一个 ‘./’代表位置，第二个 ‘./’代表所有文件。
COPY ./ ./

# 复制好之后执行的动作
RUN npm install

# 猜测是运行进入命令之后执行的命令，每个 dockerfile 只有一条 CMD 命令。
CMD ["/bin/bash"]
```

```bash
$ docker build -t my-container .
$ docker run -it my-container
$ ls
$ npm start
```

- 注意，此时应该无法访问 port 4000.

- `每次修改 local code，必须重新 build container。`

如果想从本地 browser 访问 docker container 里面的 app port，需要做 port binding：

```bash
$ docker run -it -p 4000:4000 my-container
$ npm start
```

- 这时访问 local 就有反应了。


关于 docker compose：

- 创建一个新文件，‘docker-compose.yml’

- [docker-compose cli](https://docs.docker.com/compose/reference/overview/)

```yml
version: '3.8'

services:
  smart-brain-api:
    container_name: backend
    # image: node:12.18.2 这个在已经有 image 的情况下可以省略
    build: ./ # 这意味着在 dockerfile 的路径下生成 service
    command: npm start
    working_dir: /app
    ports:
      - "4000:4000"
```

```bash
$ docker-compose build
```

- 编写 yml file 一定要注意空格。

- 查看 yml 文件中的 version 可以看这里：
[doc](https://docs.docker.com/compose/compose-file/)

- 初步来看， docker-compose 是一个集成功能，可以创建 container，还可以连带创建附属软件环境，比如说 database service

```bash
$ docker-compose run <serviecesName>
$ docker-compose run smart-brain-api
```

- 另外需要注意的是 yml file 中的` working_dir` 要跟 dockerfile 中的一致。

- 每次修改 yml file 都需要执行下面命令

```bash
$ docker-compose build
$ docker-compose run smart-brain-api
```

```bash
$ docker-compose down
$ docker-compose up --build
```

- docker-compose down 这个命令可以清楚一些缓存，7/20 尝试一个错误就是，在没有执行 docker-compose down 的情况下，执行

```bash
$ docker-compose build
$ docker-compose run -p 4000:4000 smart-brain-api
```

- 会使 app 运行，但就是没办法访问接口。

- docker-compose run -p 4000:4000 smart-brain-api 跟 docker-compose up --build 有什么区别？

```bash
docker-compose down
docker-compose build
docker-compose run -p 4000:4000 smart-brain-api
docker-compose run smart-brain-api
```

```bash
docker-compose down
docker-compose up --build
```

- 目前看来 docker-compose up --build 更好用。
- 更正，上面两者效果一样，但后者更集成简单一点。

- 之后的观点，run 只能走一个 service，up 是能走一群 service

- run 命令需要指定端口。

- 使用 volumes 加入 nodemon：

```yml
version: '3.8'

services:
  smart-brain-api:
    container_name: backend
    build: ./
    command: npm start
    working_dir: /usr/src/smart-brain-api
    ports:
      - "4000:4000"
    volumes:
      - ./:/usr/src/smart-brain-api
```

- volumes 在这里有点同步更新 container 的感觉了。



- 其他执行命令：

```bash
docker-compose up -d
docker-compose exec smart-brain-api bash
```

- 通过上面的命令就可以在边运行 container 变运行 bash terminal 命令。

- postgres 设置

```yml
version: '3.8'

services:

  # Backend API
  smart-brain-api:
    container_name: backend
    build: ./
    command: npm start
    working_dir: /usr/src/smart-brain-api
    environment:
      POSTGRES_HOST: postgres
      POSTGRES_USER: sally
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: smart-brain-docker
    links:
      - postgres
    ports:
      - "4000:4000"
    volumes:
      - ./:/usr/src/smart-brain-api

  # Postgres
  postgres:
    environment:
      POSTGRES_HOST: postgres
      POSTGRES_USER: sally
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: smart-brain-docker
    # container_name: postgres
    image: postgres
    ports:
      - "5432:5432"
```

```bash
docker-compose down
docker-compose up --build
```

- 要注意的是执行这个命令的时候如果 local postgres 已经连接了 port 5432，就算你用 postico 登录也不能用上面定义的 USER 和 PASSWORD 定义，因为这个时候 5432 端口是为 local database 服务，只能查询 local database 上面的数据。需要关掉本地 5432 端口的数据库服务之后，再运行上面的命令，就可以用 postico 用上面的 USER 和 PASSWORD 登录 docker 对应的database。这个概念需要后面进一步分解说明。

```bash
docker-compose up -d
psql postgres://sally:secret@localhost:5432/smart-brain-docker
```
- 在 terminal 链接操作 postgres

- 更新版本：

```yml
version: '3.8'

services:

  # Backend API
  smart-brain-api:
    container_name: backend
    build: ./
    command: npm start
    working_dir: /usr/src/smart-brain-api
    environment:
      POSTGRES_URI: postgres://sally:secret@postgres:5432/sm
art-brain-docker
    links:
      - postgres
    ports:
      - "4000:4000"
    volumes:
      - ./:/usr/src/smart-brain-api

  # Postgres
  postgres:
    environment:
      POSTGRES_HOST: postgres
      POSTGRES_USER: sally
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: smart-brain-docker
    # container_name: postgres
    image: postgres
    ports:
      - "5432:5432"
```

- 然后修改 server.js

```js
const db = knex({
  client: process.env.POSTGRES_CLIENT,
  connection: {
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB
  }
});
```

- 为：

```js
const db = knex({
  client: process.env.POSTGRES_CLIENT,
  connection: process.env.POSTGRES_URI
});
```

- 一样起相同作用。

- 下一步是创建 tables，

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

- 生成一个 postgre 文件夹

- 文件夹下面有一个 tables 文件夹，里面有3个 sql 文件，同时有一个新的 dockerfile，

- 删除 docker-compose 下面的语句：

```diff
- image: postgres
+ build: /postgres
```

-   最新更新，删除 docker-compose 文件下 的 link 语句也没问题。By default Compose sets up a single network for your app. Each container for a service joins the default network and is both reachableby other containers on that network, and discoverable by them at a hostname identical to the container name. If you want a custom network, you can use the networks property. Don't get too confused by this though. This gets into some really advanced networking that is very specialized. The big takeaway is that you no longer need the links property.

- 因为已经有生成 service 的 dockerfile 文件，所以直接找到相应的文件夹执行 build 文件。

- 查询 postgres 版本：psql --version

- 编写 sql 文件是一件需要非常细心的事情。具体到空格和标点符号都不能遗漏。

- [创建 sql](http://joshualande.com/create-tables-sql)

- '$2a$10$KqWcUNkhvZXYQcxcbSxhCeyTFA.s0/fHR2xXhsi58//jmWvPqGA8W' 对应密码`123`,这是个字符串，使用 bcrypt-nodejs 库生成。




