import AuthReducer from './authReducers'
import { combineReducers } from 'redux';

export default combineReducers({
    auth : AuthReducer
})