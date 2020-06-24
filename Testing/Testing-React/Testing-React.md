# Web development tools (Part 14)

- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)

## `Section: Testing` (Part 2: React)

### `Summary`: In this documentation, we learn testing React.

### `Check Dependencies & Tools:`

- Enzyme

------------------------------------------------------------

#### `本章背景：`
- 本章分三部分，分别是：
    1. Testing function 
    2. Testing React :white_check_mark:
    3. Testing Redux

------------------------------------------------------------

### <span id="14.0">`Brief Contents & codes position`</span>

- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)

- [14.1 Setup.](#14.1)
- [14.2 Snapshot testing.](#14.2)
- [14.3 Code coverage.](#14.3)
- [14.4 Stateful component testing.](#14.4)

------------------------------------------------------------

### <span id="14.1">`Step1: Setup.`</span>

- #### Click here: [BACK TO CONTENT](#14.0)

- Working with React 16 [Documentation](https://enzymejs.github.io/enzyme/docs/installation/index.html)

```bash
$ npm i --save react@16 react-dom@16
$ npm i --save-dev enzyme enzyme-adapter-react-16
```

__`Location: ./src/setupTests.js`__

```js
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
```

----------------------------------------------------------------------------

#### `Comment:`
1. 在 create-react-app 中，可以直接把 `setupTests.js` 放进 `src` 文件夹中它就可以直接自动调用。

### <span id="14.2">`Step2: Snapshot testing.`</span>

- #### Click here: [BACK TO CONTENT](#14.0)

    1. Build a testing component snapshot.

     - __`Location: ./src/Card.test.js`__

    ```js
    import { shallow } from 'enzyme';
    import React from 'react';
    import Card from './Card';
    import '../setupTests'

    it('expect to render Card component', () => {
        expect(shallow(<Card />).length).toEqual(1);
    })

    it('expect to render Card component', () => {
        expect(shallow(<Card />)).toMatchSnapshot();
    })
    ```

    2. Handle compnents snapshot with map method.

    - __`Location: ./src/CardList.test.js`__

    ```js
    import { shallow } from 'enzyme';
    import React from 'react';
    import CardList from './CardList';
    import '../setupTests'

    it('expect to render CardList component', () => {
        const mockRobots = [
            {
                id: 1,
                name: 'John Snow',
                username: "JohnJohn",
                email: 'john@test.com'
            },
            {
                id: 2,
                name: 'Simon King',
                username: "Sisi",
                email: 'si@test.com'
            }
        ];

        expect(shallow(<CardList robots={mockRobots} />)).toMatchSnapshot();
    })
    ```
----------------------------------------------------------------------------

#### `Comment:`
1. shallow 建造的是一个虚拟的跟原 component 一样结构的组件。
2. toMatchSnapshot() 第一次的命令是建立一个全新 snapshot，第二次命令就是对比原组件和 snapshot 的区别。
3. 对于有 map method 的组件群，测试的方法是建立模拟数据，然后向虚拟 component 传递参数。

### <span id="14.3">`Step3: Code coverage.`</span>

- #### Click here: [BACK TO CONTENT](#14.0)

    1. 显示测试覆盖率
    ```bash
    $ npm test -- --coverage
    ```
----------------------------------------------------------------------------

#### `Comment:`
1. 

### <span id="14.4">`Step4: Stateful component testing.`</span>

- #### Click here: [BACK TO CONTENT](#14.0)

    - __`Location: ./src/CounterButton.test.js`__

    ```js
    import { shallow } from 'enzyme';
    import React from 'react';
    import CounterButton from './CounterButton';
    import '../setupTests';

    it('expect to render CounterButton component', () => {
        const mockColor = 'red';
        expect(shallow(<CounterButton color={mockColor} />)).toMatchSnapshot();
    })

    it('correctly increments the counter', () => {
        const mockColor = 'red';
        const wrapper = shallow(<CounterButton color={mockColor} />);

        wrapper.find('[id="counter"]').simulate("click");
        expect(wrapper.state()).toEqual({ count: 2 });
        wrapper.find('[id="counter"]').simulate("click");
        expect(wrapper.state()).toEqual({ count: 3 });
        wrapper.find('[id="counter"]').simulate("keypress");
        expect(wrapper.state()).toEqual({ count: 3 });

        expect(wrapper.props().color).toEqual('red');
    })
    ```


#### `Comment:`
1. 以上代码包括三部分：
```js
//向虚拟组件传递 props：
<CounterButton color={mockColor} />

//模拟一个动作，检验 state 的变化：
wrapper.find('[id="counter"]').simulate("click");
expect(wrapper.state()).toEqual({ count: 2 });

//检验虚拟组件得到的 props：
expect(wrapper.props().color).toEqual('red');
```

- #### Click here: [BACK TO CONTENT](#14.0)
- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)