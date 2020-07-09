import {
    CHANGE_SEARCHFIELD,
    REQUEST_ROBOTS_PENDING,
    REQUEST_ROBOTS_SUCCESS,
    REQUEST_ROBOTS_FAILED
} from './constants';

import * as reducers from './reducers';

describe('searchRobots reducer', () => {
    const initialStateSearch = {
        searchField: ''
    }
    it('should return the initial state', () => {
        expect(reducers.searchRobots(initialStateSearch, {})).toEqual({ searchField: '' })
    })
    it('should should handel CHANGE_SEARCHFIELD action', () => {
        expect(reducers.searchRobots(initialStateSearch, {
            type: CHANGE_SEARCHFIELD,
            payload: 'abc'
        })).toEqual({
            searchField: 'abc'
        })
    })
})

describe('requestRobots reducer', () => {
    const initialStateRobots = {
        robots: [],
        isPending: false
    }

    it('should return the initial state', () => {
        expect(reducers.requestRobots(initialStateRobots, {})).toEqual(initialStateRobots)
    })

    it('should should handel REQUEST_ROBOTS_PENDING action', () => {
        expect(reducers.requestRobots(initialStateRobots, {
            type: REQUEST_ROBOTS_PENDING,
        })).toEqual({
            robots: [],
            isPending: true,
        })
    })

    it('should should handel REQUEST_ROBOTS_SUCCESS action', () => {
        expect(reducers.requestRobots(initialStateRobots, {
            type: REQUEST_ROBOTS_SUCCESS,
            payload: [{
                id: 123,
                name: 'John',
                email: 'john@test.com'
            }]
        })).toEqual({
            robots: [{
                id: 123,
                name: 'John',
                email: 'john@test.com'
            }],
            isPending: false,
        })
    })

    it('should should handel REQUEST_ROBOTS_FAILED action', () => {
        expect(reducers.requestRobots(initialStateRobots, {
            type: REQUEST_ROBOTS_FAILED,
            payload: 'This is an error message.'
        })).toEqual({
            error: 'This is an error message.',
            isPending: false,
            robots: [],
        })
    })
})