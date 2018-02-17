import config from '../config';
import json from '../JSTest.json';

const initialState = json;

export default function rows(state = initialState, action) {
    if (action.type === config.reducerActions.saveRow) {
        return [
            ...state,
        ];

    } else if (action.type === config.reducerActions.editRow) {
        return [
            ...state,
        ];

    } else if (action.type === config.reducerActions.deleteRow) {
        let newState = state.filter((item, index) => index !== action.payload);

        if (newState.length === 0) {
            return [getEmptyObjLike(initialState[0])];
        }

        return newState;

    } else if (action.type === config.reducerActions.addRow) {
        return [
            ...state,
            getEmptyObjLike(state[0])
        ];

    } else if (action.type === config.reducerActions.sortRows) {

        state.sort((a, b) => {
            if (a[action.payload] < b[action.payload])
                return -1;
            if (a[action.payload] > b[action.payload])
                return 1;
            return 0;
        });

        return [
            ...state,
        ];

    } else if (action.type === config.reducerActions.gotFromDB) {
        return action.payload;

    } else if (action.type === config.reducerActions.saveToDB) {
        return [
            ...state,
        ];

    }
    return state;
}

function getEmptyObjLike(json) {
    let columns = Object.keys(json);
    let obj = {};

    columns.map(key => {
        if (key !== 'id') {
            obj[key] = '';
        } else {
            obj[key] = Date.now();
        }
    });

    return obj;
}
