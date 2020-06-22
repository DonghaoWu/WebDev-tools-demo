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

//mocks，虚拟一个 API call 的结果， mockFetch 就是一个模拟远程 API 回送数据， API endpoint 仍可以多变，但是回送数据定制，且没有对 endpoint 进行实际调用。
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