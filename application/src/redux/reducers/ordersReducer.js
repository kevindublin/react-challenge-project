import { DELETE_ORDER, EDIT_ORDER } from '../actions/types'

const INITIAL_STATE = { orders: null };
                
export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EDIT_ORDER:
            return { ...state, 
                orders: action.payload.orders }
        case DELETE_ORDER:
            return { ...state,
                orders: action.payload.orders }
        default:
            return state;
    }
}