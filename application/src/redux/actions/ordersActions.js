import { DELETE_ORDER, EDIT_ORDER } from './types';
import { SERVER_IP } from '../../private'

const finishDelete = (orders) => {
    return {
        type: DELETE_ORDER,
        payload: {
            orders
        }
    }
}


const finishEdit = (orders) => {
    return {
        type: EDIT_ORDER,
        payload: {
            orders
        }
    }
}


export const deleteOrder = (id) => {
    return (dispatch) => {
        console.log('attempring to delete...',id);
        fetch(`${SERVER_IP}/api/delete-order`, {
            method: 'POST',
            body: JSON.stringify({
                id,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(response => {
            if (response.success) {
                dispatch(finishDelete(response.orders));
            }
        })
        .catch(error => console.error(error));
        };
    }


export const editOrder = (order) => {
    return (dispatch) => {
        console.log('attempring to edit...',order.order_item);
        fetch(`${SERVER_IP}/api/edit-order`, {
            method: 'POST',
            body: JSON.stringify({
                id: id,
                ordered_by: ordered_by,
                order_item: order_item,
                quantity: quantity
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(response => {
            if (response.success) {
                dispatch(finishEdit(response.orders));
            }
        })
        .catch(error => console.error(error));
        };
    }