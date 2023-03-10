import { combineReducers,applyMiddleware,legacy_createStore} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools  } from 'redux-devtools-extension';
import { productListReducer,productDetailsReducer } from './reducers/productReducers';

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
})
const initialState = {}
const middleware = [thunk]

const store = legacy_createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store
