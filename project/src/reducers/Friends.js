import { List, Map } from 'immutable';

const friends = (state=new List(), action) => {
    switch (action.type) {
        case 'ADD_FRIEND':
            return state.push(Map(action.payload));
        default:
            return state
    }
    switch (action.type) {
        case 'CLEAR':
            delete state.data;
            return {
                ...state
            }
    }
}


export default friends