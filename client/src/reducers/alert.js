import {SET_ALERT, REMOVE_ALERT} from '../actions/types';

const initialState = [];

export default function(state =initialState, action) {
    const {type, payload} = action;

    // action takes action type and data
    // type will be evaluated bu cases
    switch(type) {
        case SET_ALERT:
            // state is immutable, so we need to include any state that is already there
            return [...state, payload];
        case REMOVE_ALERT:
            // will return all alerts except the one that matches the payload
            return state.filter(alert => alert.id !== payload);
        default:
            return state;
    }
}