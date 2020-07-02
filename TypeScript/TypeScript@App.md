# Web development tools (Part 17)

- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)

## `Section: TypeScript` (Part 2: Application)

### `Summary`: In this documentation, we learn combining App with TypeScript.

### `Check Dependencies & Tools:`

- typescript

------------------------------------------------------------

#### `本章背景：`
- __参考材料 ：[Adding TypeScript to CRA](https://create-react-app.dev/docs/adding-typescript)__

- 本节中用到的 demo app 是 `robotfriends-typescript`

- TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.

- 本章分两部分，分别是：
    1. Basic 
    2. App :white_check_mark:

------------------------------------------------------------

### <span id="17.0">`Brief Contents & codes position`</span>

- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)

- [17.1 Adding TypeScript to CRA.](#17.1)
- [17.2 Adding TypeScript to an existing app (Configuration).](#17.2)
- [17.3 Adding TypeScript to an existing app (Code).](#17.3)

------------------------------------------------------------

### <span id="17.1">`Step1: Adding TypeScript to CRA.`</span>

- #### Click here: [BACK TO CONTENT](#17.0)

1. Update the npx

```bash
$ npm uninstall -g create-react-app
$ npm install -g create-react-app
```

2. To start a new Create React App project with TypeScript:

```bash
$ npx create-react-app my-app --template typescript
```
----------------------------------------------------------------------------

3. To add TypeScript to a Create React App project:

```bash
$ npm install --save typescript @types/node @types/react @types/react-dom @types/jest
```

----------------------------------------------------------------------------

- Next, `rename any file to be a TypeScript file (e.g. src/index.js to src/index.tsx)` and restart your development server!


#### `Comment:`
1. `Benifits:` __Type errors will show up in the same console as the build one. You'll have to fix these type errors before you continue development or build your project.__


### <span id="17.2">`Step2: Adding TypeScript to an existing app. (Configuration)`</span>

- #### Click here: [BACK TO CONTENT](#17.0)

1. 对应 dependencies 可以使用的 TypeScript 版本
__`Location: ./demo-app/robotfriends-typescript/package.json`__

```js
  "devDependencies": {
    "@types/jest": "^22.2.2",
    "@types/node": "^9.6.1",
    "@types/react": "^16.1.0",
    "@types/react-dom": "^16.0.4",
    "typescript": "^3.9.5"
  }
```

2. 对应 TypeScript 的配置
__`Location: ./demo-app/robotfriends-typescript/tsconfig.json`__

```js
{
  "compilerOptions": {
    "outDir": "build/dist",
    "module": "esnext",
    "target": "es5",
    "lib": ["es6", "dom"],
    "sourceMap": true,
    "allowJs": true,
    "jsx": "react",
    "moduleResolution": "node",
    "rootDir": "src",
    "forceConsistentCasingInFileNames": true,
    "noImplicitReturns": true,
    "noImplicitThis": true,
    "noImplicitAny": false,
    "strictNullChecks": true,
    "suppressImplicitAnyIndexErrors": true,
    "noUnusedLocals": true
  },
  "exclude": [
    "node_modules",
    "build",
    "scripts",
    "acceptance-tests",
    "webpack",
    "jest",
    "src/setupTests.ts"
  ]
}
```

3. Change files name:
```diff
- ./robotfriends-typescript/src/index.js
+ ./robotfriends-typescript/src/index.tsx

- ./robotfriends-typescript/src/registerServiceWorker.js
+ ./robotfriends-typescript/src/registerServiceWorker.ts

- ./robotfriends-typescript/src/containers/App.js
+ ./robotfriends-typescript/src/containers/App.tsx


- ./robotfriends-typescript/src/components/Card.js
+ ./robotfriends-typescript/src/components/Card.tsx

- ./robotfriends-typescript/src/components/CardList.js
+ ./robotfriends-typescript/src/components/CardList.tsx

- ./robotfriends-typescript/src/components/Scroll.js
+ ./robotfriends-typescript/src/components/Scroll.tsx

- ./robotfriends-typescript/src/components/SearchBox.js
+ ./robotfriends-typescript/src/components/SearchBox.tsx
```

4. Add some code in index.tsx

__`Location: ./robotfriends-typescript/src/index.tsx`__
```js
ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
```

5. Add some types in App.tsx

__`Location: ./robotfriends-typescript/src/containers/App.tsx`__

```js
/*
... code
*/
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
  constructor() {
    super(props)
    this.state = {
      robots: [],
      searchfield: ''
    }
  }
/*
... code
*/
}

export default App;
```
#### `Comment:`
1. 


### <span id="17.3">`Step3: Adding TypeScript to an existing app (code).`</span>

- #### Click here: [BACK TO CONTENT](#17.0)

1. 向下 component 的参数传递。
- __`Location: ./robotfriends-typescript/src/containers/CardList.tsx`__

```tsx
import * as React from 'react';
import Card from './Card';
import { IRobot } from '../containers/App'

const CardList = ({ robots }: { robots: Array<IRobot> }) => {
  return (
    <div>
      {
        robots.map((user, i) => {
          return (
            <Card
              key={i}
              id={robots[i].id}
              name={robots[i].name}
              email={robots[i].email}
            />
          );
        })
      }
    </div>
  );
}

export default CardList;
```

2. 从上 component 接收的参数为普通类型参数。
- __`Location: ./robotfriends-typescript/src/containers/Card.tsx`__

```tsx
import * as React from 'react';

interface CardStatelessProps {
  name: string,
  email: string,
  id: number,
}

const Card: React.SFC<CardStatelessProps> = ({ name, email, id }) => {
  return (
    <div className='tc grow bg-light-green br3 pa3 ma2 dib bw2 shadow-5'>
      <img alt='robots' src={`https://robohash.org/${id}?200x200`} />
      <div>
        <h2>{name}</h2>
        <p>{email}</p>
      </div>
    </div>
  );
};

export default Card;
```

3. 从上 component 接收的参数为 component。
- __`Location: ./robotfriends-typescript/src/containers/Scroll.tsx`__

```tsx
import * as React from 'react';

type Props = {
  children?: JSX.Element
}

const Scroll = (props: Props) => {
  return (
    <div style={{ overflow: 'scroll', border: '5px solid black', height: '800px' }}>
      {props.children}
    </div>
  );
};

export default Scroll;
```

4. 从上 component 接收的参数为 function，且函数参数为键盘输入。
- __`Location: ./robotfriends-typescript/src/containers/SearchBox.tsx`__

```tsx
import * as React from 'react';

interface ISearchBoxProps {
  searchChange(event: React.SyntheticEvent<HTMLInputElement>): void
}

const SearchBox = ({ searchChange }: ISearchBoxProps) => {
  return (
    <div className='pa2'>
      <input
        className='pa3 ba b--green bg-lightest-blue'
        type='search'
        placeholder='search robots'
        onChange={searchChange}
      />
    </div>
  );
};

export default SearchBox;
```

5. 在最上层 component 定义各函数的 type （同时需要在接收参数的地方进行对应定义）。
- __`Location: ./robotfriends-typescript/src/containers/App.tsx`__

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



- __参考材料 ：[Adding TypeScript to CRA](https://create-react-app.dev/docs/adding-typescript)__

- #### Click here: [BACK TO CONTENT](#17.0)
- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)