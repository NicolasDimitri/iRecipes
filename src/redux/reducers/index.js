import { combineReducers } from 'redux';
import requestReducers from './requestsReducer';

const rootReducer = combineReducers({ requestReducers });

export default rootReducer;
