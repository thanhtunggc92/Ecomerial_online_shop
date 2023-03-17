import { combineReducers,applyMiddleware,legacy_createStore} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools  } from 'redux-devtools-extension';
import { productListReducer,productDetailsReducer } from './reducers/productReducers';
import { cartReducers } from './reducers/cartReducers'
import { userLoginReducer, userRegisterReducer,userDetailsReducer } from './reducers/userReducers'




const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducers,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails:userDetailsReducer,
})



const cartItemFromStorage = localStorage.getItem('cartItems')?
        JSON.parse(localStorage.getItem('cartItems')) : []


const userInfoFromStorage = localStorage.getItem('userInfo')?
        JSON.parse(localStorage.getItem('userInfo')) : null

        
const initialState = {
    cart: {'cartItems':cartItemFromStorage},
    userLogin: {'userInfo': userInfoFromStorage},
}
const middleware = [thunk]

const store = legacy_createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store
