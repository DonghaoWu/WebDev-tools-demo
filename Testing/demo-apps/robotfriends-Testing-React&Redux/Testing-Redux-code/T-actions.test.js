import * as actions from './actions';
import {
    CHANGE_SEARCHFIELD,
    REQUEST_ROBOTS_PENDING,
    REQUEST_ROBOTS_SUCCESS,
    REQUEST_ROBOTS_FAILED
} from './constants';

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('async requestRobots action', () => {
    afterEach(() => {
        fetchMock.restore()
    })

    it('creates REQUEST_ROBOTS_SUCCESS when fetching has been done', () => {
        fetchMock.getOnce('https://jsonplaceholder.typicode.com/users', {
            body: [{
                id: 1,
                name: 'John',
                email: 'john@test.email',
            }],
            headers: { 'content-type': 'application/json' }
        })

        const expectedActions = [
            {
                type: REQUEST_ROBOTS_PENDING
            },
            {
                type: REQUEST_ROBOTS_SUCCESS,
                payload:
                    [
                        {
                            id: 1,
                            name: 'John',
                            email: 'john@test.email',
                        }
                    ]
            }
        ]
        const store = mockStore({ robots: [] })

        return store.dispatch(actions.requestRobots()).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
})

it('should create an action to search robots', () => {
    const text = 'wooo';
    const expectedAction = {
        type: CHANGE_SEARCHFIELD,
        payload: text
    }
    expect(actions.setSearchField(text)).toEqual(expectedAction)
})

it('should handles requesting robots API', () => {
    const store = mockStore();
    store.dispatch(actions.requestRobots());
    const action = store.getActions();
    // console.log(action);
    const expectedAction = {
        type: REQUEST_ROBOTS_PENDING
    }

    expect(action[0]).toEqual(expectedAction)
})