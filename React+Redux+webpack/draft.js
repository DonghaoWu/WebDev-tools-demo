
import {
    CHANGE_SEARCH_FIELD,
    REQUEST_ROBOTS_PENGING,
    REQUEST_ROBOTS_SUCCESS,
    REQUEST_ROBOTS_FAILED,
} from './constants.js'
const initialState = {
    searchField: '',
}


export const searchRobots = (state = initialState, action = {}) => {
    switch (action.type) {
        case CHANGE_SEARCH_FIELD:
            return { ...state, { searchField: action.payload }
    };
        default:
return state;
    }
}