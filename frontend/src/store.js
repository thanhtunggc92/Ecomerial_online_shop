import { combineReducers,applyMiddleware,legacy_createStore} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools  } from 'redux-devtools-extension';
import { productListReducer,productDetailsReducer } from './reducers/productReducers';
import { cartReducers } from './reducers/cartReducers'
import { userLoginReducer, userRegisterReducer,
    userDetailsReducer,userUpdateProfileReducer,
} from './reducers/userReducers'
import { orderCreateReducer,orderDetailsReducer,orderPayReducer,orderListMyReducer } from './reducers/orderReducers'




const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducers,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails:userDetailsReducer,
    userUpdateProfile:userUpdateProfileReducer,
    orderCreate:orderCreateReducer,
    orderDetails:orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy:orderListMyReducer,
})



const cartItemFromStorage = localStorage.getItem('cartItems')?
        JSON.parse(localStorage.getItem('cartItems')) : []


const userInfoFromStorage = localStorage.getItem('userInfo')?
        JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')?
        JSON.parse(localStorage.getItem('shippingAddress')) : {}
const initialState = {
    cart: {'cartItems':cartItemFromStorage,'shippingAddress':shippingAddressFromStorage},
    userLogin: {'userInfo': userInfoFromStorage},
}
const middleware = [thunk]

const store = legacy_createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store
