import React, { Component } from 'react';
import { Template } from '../../components';
import { SERVER_IP } from '../../private';
import './viewOrders.css';

const DEL_ORDER_URL = `${SERVER_IP}/api/delete-order`
const GET_ORDERS_URL = `${SERVER_IP}/api/current-orders`

class ViewOrders extends Component {
    state = {
        orders: []
    }

    getOrders() {
        fetch(GET_ORDERS_URL)
            .then(response => response.json())
            .then(response => {
                if(response.success) {
                    this.setState({ orders: response.orders });
                } else {
                    console.log('Error getting orders');
                }
            });
    }
    
    componentDidMount() {
        this.getOrders();
    }


    onDelete(id) {
        console.log('attempring to delete...',id);
        fetch(DEL_ORDER_URL, {
            method: 'POST',
            body: JSON.stringify({
                id,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(response => console.log("Successfully deleted.", JSON.stringify(response)))
        .catch(error => console.error(error));
        this.getOrders();
        }


    render() {
        return (
            <Template>
                <div className="container-fluid">
                    {this.state.orders.map(order => {
                        const createdDate = new Date(order.createdAt);
                        return (
                            <div className="row view-order-container" key={order._id}>
                                <div className="col-md-4 view-order-left-col p-3">
                                    <h2>{order.order_item}</h2>
                                    <p>Ordered by: {order.ordered_by || ''}</p>
                                </div>
                                <div className="col-md-4 d-flex view-order-middle-col">
                                    <p>Order placed at {`${createdDate.getHours()}:${createdDate.getMinutes()}:${createdDate.getSeconds()}`}</p>
                                    <p>Quantity: {order.quantity}</p>
                                 </div>
                                 <div className="col-md-4 view-order-right-col">
                                     <button className="btn btn-success">Edit</button>
                                     <button className="btn btn-danger" onClick={() => this.onDelete(order._id)}>Delete</button>
                                 </div>
                            </div>
                        );
                    })}
                </div>
            </Template>
        );
    }
}

export default ViewOrders;
