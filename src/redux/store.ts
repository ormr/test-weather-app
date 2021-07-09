import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { appReducer } from './reducer';
import thunk from 'redux-thunk'

const middleware = [thunk];

const store = createStore(
  combineReducers({ weather: appReducer }),
  composeWithDevTools(applyMiddleware(...middleware))
);

export {
  store
};