1. Install dependency
```bash
sudo npm install -g serverless

serverless

sls

sls create -t aws-nodejs # 在当前文件夹内生成 3 个新文件

mkdir rankly

# 3 个文件, handler.js, serverless.yml, .gitignore
```

修改 serverless.yml

```yml
runtime: nodejs6.10

region: us-east-1

functions:
    hello:
        handler: handler.hello


    - s3: ${env:BUCKET} # 触发函数的文件夹

    - schedule: rate(10 minutes)
```

2. set up IAM

IAM -> Users -> Add user -> rankly -> Programmatic access -> attach existing policies -> AdminstratorAccess -> next -> get access key and secret access key

```bash
sls config credentials --provider aws --key <access key> --secret <secret access key>

cd ~/.aws
ls
nano credentials
```

3. deploy the function

- change function name in serverless.yml
- change function name in handler.js

- change `stage: dev` in serverless.yml

- change `service: aws-rankly-lambda`, then name is from AWS IAM add user.


```bash
sls deploy

sls invoke --function rank
sls invoke local --function rank

```

```yml
    events: # api gateway
        - http:
            path: rank
            method: get
```

```bash
sls deploy # now get a endpoints after deployed
```

- paste the endpoint in browser

4. work on function


```js
'use strict'

const emojis = [
    '😄', '😃', '😀', '😊', '😉', '😍', '🔶', '🔷', '🚀'
];

module.exports.rank = (event, content, callback) => {
    const rank = event.queryStringParameters.rank;
    const rankEmoji = emojis[rank >= emojis.length ? emojis.length - 1 : rank];

    const response = {
        statusCode: 200,
        headers:{
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            message: 'This is a message.',
            input: rankEmoji,
        })
    }
}

callback(null, response)
```

test the function by pasting the endpoint in browser.

`.../rank/?rank=8`

5. Back to front end, uslize the endpoint.

`Rank.js`







