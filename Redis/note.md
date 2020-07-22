Install redis

download tag

redit website

follow the installation

src/redis-server 连接 redis

Ready to accept connections

cli

src/redis/cli 打开 redis cli


```bash
SET name "tony"

GET name

EXISTS name

DEL name

EXISTS name

GET name
```

`string`
```bash
MSET a 2 b 5
GET a
GET b
MGET a b
```


```bash
SET session "Jenny"

EXPIRE session 10

GET session

GET session

```

```bash
SET counter 1000
INCRBY counter 33
GET counter
DECR counter
```



`hash - object`
```bash
HMSET user id 45 name "Jonny"
HGET user id
HGET user name
HGETALL user
```

`link list`

```bash
LPUSH ourlist 10
RPUSH ourlist "hello"
LRANGE ourlist 0 1
LPUSH ourlist 55
LRANGE ourlist 0 2
RPOP ourlist
LRANGE ourlist 0 2
```

`set & sorted sets`

```bash
SADD ourset 1 2 3 4 5
SMEMBERS ourset
SADD ourset 1 2 3 4
SMEMBERS ourset

SISMEMBER ourset 5
SISMEMBER ourset 20

ZADD team 50 "wiz"
ZADD team 40 "cav"
ZRANGE team 0 1
ZADD team 10 "bos"
ZRANGE team 0 2
ZRANK team "wiz"
```


