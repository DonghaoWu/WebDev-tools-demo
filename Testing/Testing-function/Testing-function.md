# Web development tools (Part 13)

- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)

## `Section: Testing`(Part3.1 Function)

### `Summary`: In this documentation, we learn testing function.

### `Check Dependencies & Tools:`

- jest

------------------------------------------------------------

#### `本章背景：`
- 本章分三部分，分别是：
    1. Testing function :white_check_mark:
    2. Testing React
    3. Testing Redux

------------------------------------------------------------

### <span id="13.0">`Brief Contents & codes position`</span>

- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)

- [13.1 Setup.](#13.1)
- [13.2 Test sync function.](#13.2)
- [13.3 Test async function.](#13.3)
- [13.4 Build mocks to test async function.](#13.4)

------------------------------------------------------------

### <span id="13.1">`Step1: Setup.`</span>

- #### Click here: [BACK TO CONTENT](#13.0)

```bash
$ npm init -y
$ npm i --save-dev jest
```

__`Location: ./package.json`__

```json
{
  "name": "demo-app",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "jest --watch *.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "jest": "^26.0.1"
  },
  "dependencies": {
    "node-fetch": "^2.6.0"
  }
}
```

----------------------------------------------------------------------------

#### `Comment:`
1. 这里主要是修改了一条 script
```diff
+ "test": "jest --watch *.js"
```


### <span id="13.2">`Step2: Test sync function.`</span>

- #### Click here: [BACK TO CONTENT](#13.0)

    - __`Location: ./sync-func.js`__

    ```js
    const googleDatabase = [
        'cat.com',
        'souprecipes.com',
        'flowers.com',
        'animals.com',
        'catpictures.com',
        'myfavouritecats.com'
    ]

    const googleSearch = (searchInput, db) => {
        const matches = db.filter(website => {
            return website.includes(searchInput);
        })
        return matches.length > 3 ? matches.slice(0, 3) : matches;
    }

    module.exports = googleSearch;
    ```

    - __`Location: ./sync-func.test.js`__

    ```js
    const googleSearch = require('./sync-func')

    const dbMock = [
        'dog.com',
        'cheesepuff.com',
        'nike.com',
        'dogpictures.com',
        'myfavouritedogs.com'
    ]

    describe('googleSearch', () => {
        it('is searching google', () => {
            expect(googleSearch('testtest', dbMock)).toEqual([]);
            expect(googleSearch('dog', dbMock)).toEqual(['dog.com', 'dogpictures.com', 'myfavouritedogs.com'])
        })

        it('work with undefined and null input', () => {
            expect(googleSearch(undefined, dbMock)).toEqual([]);
            expect(googleSearch(null, dbMock)).toEqual([])
        })

        it('does not return more than 3 matches', () => {
            expect(googleSearch('.com', dbMock).length).toEqual(3);
        })
    })
    ```
----------------------------------------------------------------------------

#### `Comment:`
1. 测试文件第一段名称要跟被测文件相同。
2. 常用关键词：

```diff
+ it
+ describe
+ expect
+ toEqual
```

### <span id="13.3">`Step3: Test async function.`</span>

- #### Click here: [BACK TO CONTENT](#13.0)


    - __`Location: ./async-func.js`__

    ```js
    const fetch = require('node-fetch');

    const getPeople = (callback) => {
        return callback('https://swapi.dev/api/people')
            .then(response => response.json())
            .then(data => {
                return {
                    count: data.count,
                    results: data.results
                }
            })
            .catch(error => {
                console.log(error);
            })
    }

    const getPeopleAsync = async (callback) => {
        try {
            const res = await callback('https://swapi.dev/api/people');
            const data = await res.json();
            return {
                count: data.count,
                results: data.results
            }
        } catch (error) {
            console.log(error);
        }
    }

    module.exports = {
        getPeople,
        getPeopleAsync
    }

    // module.exports = {
    //     getPeople:getPeople,
    //     getPeopleAsync:getPeopleAsync
    // }

    // getPeople(fetch);
    // getPeopleAsync(fetch);
    ```

    - __`Location: ./async-func.test.js`__

    ```js
    const fetch = require('node-fetch');
    const asyncFunc = require('./async-func');

    it('calls asyncFunc to get people', (done) => {
        expect.assertions(1);
        asyncFunc.getPeople(fetch).then(data => {
            expect(data.count).toEqual(82);
            done();
        })
    })

    it('calls asyncFunc to get people with async', () => {
        expect.assertions(2);
        return asyncFunc.getPeopleAsync(fetch).then(data => {
            expect(data.count).toEqual(82);
            expect(data.results.length).toBeGreaterThan(5);
        })
    })
    ```
----------------------------------------------------------------------------

#### `Comment:`
1. 在测试 async fucntion 时，必须注意的几个关键词：

:star: expect.assertions();
:star: done
:star: return

### <span id="13.4">`Step4: Delete 'shouldComponentUpdate' in Header & add it into CounterButton.`</span>

- #### Click here: [BACK TO CONTENT](#13.0)

    - __`Location: ./Performance2.2/edition2/Header.js`__

    ```js
    import React, { Component } from 'react';
    import CounterButton from './CounterButton'

    class Header extends Component {
        // shouldComponentUpdate(nextProps, nextState) {
        //     return false;
        // }

        render() {
            console.log('Header');
            return (
                <div>
                    <h1 className='f1'>RoboFriends</h1>
                    <CounterButton />
                </div>
            )
        }
    }

    export default Header;
    ```

    - __`Location: ./Performance2.2/edition2/CounterButton.js`__

    ```js
    import React, { Component } from 'react';

    class CounterButton extends Component {
        constructor() {
            super();
            this.state = {
                count: 0,
            }
        }

        shouldComponentUpdate(nextProps, nextState) {
            if (this.state.count !== nextState.count) {
                return true;
            }
            return false;
        }

        handleClick = () => {
            this.setState(state => {
                return { count: state.count + 1 }
            });
        }

        render() {
            console.log('CounterButton');
            return (
                <button color={this.props.color} onClick={this.handleClick}>
                    Count:{this.state.count}
                </button>
            )
        }
    }

    export default CounterButton;
    ```

- __`Result`__:

<p align="center">
<img src="../assets/p13-5.png" width=90%>
</p>

----------------------------------------------------------------------------

<p align="center">
<img src="../assets/p13-6.png" width=90%>
</p>

----------------------------------------------------------------------------


#### `Comment:`
1. `shouldComponentUpdate` 在这里只阻断了 `CounterButton` 的 `rerender`。

- #### Click here: [BACK TO CONTENT](#13.0)
- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)



