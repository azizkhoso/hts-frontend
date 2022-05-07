import { combineReducers, createStore } from 'redux';

import account from './reducers/account';
import toasts from './reducers/toasts';

const rootReducer = combineReducers({
  account,
  toasts,
});

const store = createStore(rootReducer);

export default store;
