import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Template } from '../../components';
import { SERVER_IP } from '../../private';
import './viewOrders.css';
import { deleteOrder, editOrder } from '../../redux/actions/ordersActions';

const DEL_ORDER_URL = `${SERVER_IP}/api/delete-order`
const GET_ORDERS_URL = `${SERVER_IP}/api/current-orders`

const mapActionsToProps = dispatch => ({
    onDelete(id) {
      dispatch(deleteOrder(id))
    }
  })

class ViewOrders extends Component {
    state = {
        orders: []
    }

    delete(id) {
        // not working, tried to follow the pattern on loginForm
        deleteOrder(id);
      }

    
    edit() {
        // figure out how to edit -- render order form? 
        // create new form? push back to OrderForm and have it also handle editing?
        console.log("ta ta for now")
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
                                     <button className="btn btn-success"onClick={() => this.edit(order)}>Edit</button>
                                     <button className="btn btn-danger" onClick={() => this.delete(order._id)}>Delete</button>
                                 </div>
                            </div>
                        );
                    })}
                </div>
            </Template>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
      orders: state.orders
    }
  };

const mapDispatchToProps = (dispatch) => {
    return {
      deleteOrder: id => dispatch(deleteOrder(id)),
      editOrder: order => dispatch(editOrder(order))
    }
  };

export default connect(mapStateToProps, mapActionsToProps, mapDispatchToProps)(ViewOrders);
