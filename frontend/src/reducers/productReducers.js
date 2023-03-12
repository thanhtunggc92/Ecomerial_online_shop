 export const productListReducer = (state ={products:[]}, action)=>{
    switch(action.type){
        case 'RPODUCT_LIST_REQUEST':
            return {loading:true, products:[]}
        case 'RPODUCT_LIST_SUCCESS':
            return {loading:false, products:action.payload }

        case 'RPODUCT_LIST_FAIL':
            return {loading:false, products:action.payload}
        
        default:
            return state
    }
}