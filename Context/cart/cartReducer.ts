import { CartState } from './CartProvider';
import { ICartProduct } from '../../interfaces/cart';

type CartActionType = |
{ type: '[Cart] - loadCart from cookies | storage', payload: ICartProduct[] } |
{ type: '[Cart] - updateItemsCart', payload: ICartProduct[] } |
{ type: '[Cart] - updateProductQuantity', payload: ICartProduct } |
{ type: '[Cart] - removeCartProduct', payload: ICartProduct }

export const CartReducer = (state: CartState, action: CartActionType): CartState => {

    switch (action.type) {
        case '[Cart] - loadCart from cookies | storage':
            return {
                ...state,
                cart: [...action.payload]
            }

        case '[Cart] - updateItemsCart':
            return {
                ...state,
                cart: action.payload
            }
        case '[Cart] - updateProductQuantity':
            return {
                ...state,
                cart: state.cart.map(p => {
                    if (p._id === action.payload._id && p.size === action.payload.size) {
                        return action.payload;
                    }

                    return p;
                })
            }
        case '[Cart] - removeCartProduct':
            return {
                ...state,
                cart: state.cart.filter(p => !(p._id === action.payload._id && p.size === action.payload.size))
            }

        default:
            return state;   
    }
}