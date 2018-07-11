import { List, Map } from 'immutable';

const friends = (state=new List(), action) => {
    switch (action.type) {
        case 'ADD_FRIEND':
            return state.push(Map(action.payload));
        case 'CLEAR':
            state=new List();
            return state;

        default:
            return state
    }

}


export default friends