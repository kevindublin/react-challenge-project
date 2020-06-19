import { combineReducers } from 'redux';
import TempReducer from './tempReducer';
import authReducer from './authReducer';
import ordersReducer from './ordersReducer';

export default combineReducers({
  temp: TempReducer,
  auth: authReducer,
  orders: ordersReducer,
});