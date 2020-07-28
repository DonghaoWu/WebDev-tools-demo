1. Install dependency.

```bash
$ sudo npm install -g serverless
$ sls
$ sls create -t aws-nodejs # 在当前文件夹内生成 3 个文件, handler.js, serverless.yml, .gitignore
```

2. 在 IAM add user ，并记住 3 个参数（在 backend .env）

username：smart-brain-lambda
Access key：AKIAQUCP5UXMAMCAPYHM
Secret Key：----

3. 修改 serverless.yml

```yml
service: smart-brain-lambda

provider:
  name: aws
  runtime: nodejs12.x

  stage: dev
  region: us-east-1

functions:
  rank:
    handler: handler.rank
    events:
      - http:
          path: rank
          method: get
```

4. 以 Access key 和 secret key 连接 AWS

```bash
sls config credentials --provider aws --key <access key> --secret <secret access key>
```

5. 修改 function 内容

```js
'use strict';

const emojis = [
  '😄', '😃', '😀', '😊', '😉', '😍', '🔶', '🔷', '🚀'
];

module.exports.rank = async event => {
  const rank = event.queryStringParameters.rank;
  const rankEmoji = emojis[rank >= emojis.length ? emojis.length - 1 : rank];
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: rankEmoji,
      },
      null,
      2
    ),
  };
};
```

6. Deploy the function.

```bash
$ sls deploy

$ sls invoke --function rank
$ sls invoke local --function rank
```

7. Get the Lambda endpoint.（在 backend .env）

8. Use the endpoint in front end.

```jsx
import React from 'react';

class Rank extends React.Component {
  constructor() {
    super();
    this.state = {
      emoji: '',
    }
  }

  componentDidMount() {
    this.generateEmoji(this.props.entries);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.entries === this.props.entries && prevProps.name === this.props.name) {
      return null;
    }
    this.generateEmoji(this.props.entries)
  }

  generateEmoji = (entries) => {
    fetch(`https://0ss7le4psc.execute-api.us-east-1.amazonaws.com/dev/rank?rank=${entries}`)
      .then(res => res.json())
      .then(data => {
        return this.setState({ emoji: data.input })
      })
  }

  render() {
    return (
      <div>
        <div className='white f3'>
          {`${this.props.name}, your current entry count is...`}
        </div>
        <div className='white f1'>
          {this.props.entries}
        </div>
        <div className='white f1'>
          {this.state.emoji}
        </div>
      </div>
    )
  }
}

export default Rank;
```

- 7/28 修补无输入图片 url 的漏洞。
- yml 里面的 stage 可以修改为 prod。
- 7/28 已删除 iam user(这样还不会停止 lambda，`需要进入 Lambda 删除 function`)，重装要记得设置 username 为：smart-brain-lambda，然后取得 2 个 key， deploy 之后取得 endpoint 复制到 Rank.js