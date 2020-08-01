Code PR -> tests -> Build -> Merge -> Acceptance Test -> Deploy

happen in the beginning

TypeScript Lint Tests : local
Prettier : remote
circleCI : remote continuous integration
code review : remote
merge : remote

[Top 8 Continuous Integration Tools](https://code-maze.com/top-8-continuous-integration-tools/)

new folder `.circleci`

circleCI 在组员使用 pull request 时才会用到。

config.yml

```yml
version : 2
jobs:
    build:
        docker:
            - image: circleci/node: 12
        steps:
            - checkout
            - run: echo "npm installing"
            - run: npm install
            - run: CI=true npm run build
    test:
        docker:
            - image: circleci/node: 12
        steps:
            - checkout
            - run: echo "testing stuff"
            - run: npm install
            - run: npm test
    hithere:
        docker:
            - image: circleci/node: 12
        steps:
            - checkout
            - run: echo "hello!!!"
workflows:
    version: 2
    build_test_lint:
        jobs:
            - build
            - hithere
            - test:
                requires:
                    - hithere
```

signin with github

set up project leave the default one

```bash
$ git checkout -b circleci
$ git add .
$ git commit -m'add yml file'
$ git push origin circleci
```

Prettier code formatter

pretty-quick

```bash
$ npm install --save-dev --save-exact prettier
$ npm pretty-quick husky --dev
```

- add script in package.json
```js
{
    "scripts":{
        "precommit": "pretty-quick --staged"
    }
}
```

It will work when we make a commit.
