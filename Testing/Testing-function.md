# Web development tools (Part 13)

- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)

## `Section: Testing` (Part 1: Function)

### `Summary`: In this documentation, we learn Function testing.

### `Check Dependencies & Tools:`

- jest

------------------------------------------------------------

#### `本章背景：`
- 本章分三部分，分别是：
    1. Function testing :white_check_mark:
    2. React testing
    3. Redux testing

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

__`Location: ./demo-apps/Testing-function/package.json`__

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

    - __`Location: ./demo-apps/Testing-function/sync-func.js`__

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

    - __`Location: ./demo-apps/Testing-function/sync-func.test.js`__

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


    - __`Location: ./demo-apps/Testing-function/async-func.js`__

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

    - __`Location: ./demo-apps/Testing-function/async-func.test.js`__

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

2. 其中 `done` 和 `return` 的用法差不多，可以了解上面代码。
3. 有时候大型的测试需要进行多个 api call，比较耗时，所以可以使用 mocks 来模拟返回的数据，详细看 `step4`.

### <span id="13.4">`Step4: Build mocks to test async function.`</span>

- #### Click here: [BACK TO CONTENT](#13.0)

    - __`Location: ./demo-apps/Testing-function/async-func.js`__

    ```js
    const fetch = require('node-fetch');

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
        getPeopleAsync
    }
    ```

    - __`Location: ./demo-apps/Testing-function/async-func.test.js`__

    ```js
    const asyncFunc = require('./async-func');

    it('getPeople returns count and results', () => {
        const mockFetch = jest.fn().mockReturnValue(Promise.resolve({
            json: () => Promise.resolve({
                count: 100,
                results: [0, 1, 2, 3, 4, 5]
            })
        }))
        
        expect.assertions(4);
        return asyncFunc.getPeopleAsync(mockFetch).then(data => {
            expect(mockFetch.mock.calls.length).toBe(1);
            expect(mockFetch).toBeCalledWith('https://swapi.dev/api/people');
            expect(data.count).toEqual(100);
            expect(data.results.length).toBeGreaterThan(3);
        })
    })
    ```


#### `Comment:`
1. mocks，虚拟一个 API call 的回传数据， mockFetch 是一个模拟远程 API 回送数据， 其中可以以 API endpoint 作为参数进行检测，整个过程回送数据预设定制，__`且没有对 endpoint 进行实际调用。`__
2. 以上可以看出，在 test 文件中没有调用任何实际 fetch 动作，且它这里相当于自我预设模拟一个远程数据，然后根据这个条件写测试文件。

- #### Click here: [BACK TO CONTENT](#13.0)
- #### Click here: [BACK TO NAVIGASTION](https://github.com/DonghaoWu/WebDev-tools-demo/blob/master/README.md)



