// import { CART_ADD_ITEM,CART_REMOVE_ITEM } from '../constants/cartConstants'




//  const cartReducers =(state ={cartItems:[]},action) =>{
//     console.log(action.type)
//     switch(action.type){
//         case CART_ADD_ITEM:
//             const item = action.payload
//             console.log('Adding item to cart:', item)
//             const existItem = state.cartItems.find(x=> x.product === item.product)
           
//             if (existItem){
//                 console.log('Item already exists in cart');
//                 return{
//                     ...state,
//                     cartItems: state.cartItems.map(x => 
//                         x.product === existItem.product ? item : x)
//                 }
//             }else{
//                 console.log('Item does not exist in cart');
//                 return{
                    
//                     ...state,
//                     cartItems:[...state.cartItems,item]
//                 }
//             }
//         default:
//             return state
//     }
    
    
// } 

// export {cartReducers}

import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,

    CART_SAVE_PAYMENT_METHOD,

    CART_CLEAR_ITEMS,
} from '../constants/cartConstants'



export const cartReducers = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            const item = action.payload
            const existItem = state.cartItems.find(x => x.product === item.product)

            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x =>
                        x.product === existItem.product ? item : x)
                }

            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }

        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.product !== action.payload)
            }

     

        default:
            return state
    }
}