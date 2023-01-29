import { CartState } from './CartProvider';
import { ICartProduct } from '../../interfaces/cart';
import { shippingAddress } from '../../interfaces';

type CartActionType = |
{ type: '[Cart] - loadCart from cookies | storage', payload: ICartProduct[] } |
{ type: '[Cart] - updateItemsCart', payload: ICartProduct[] } |
{ type: '[Cart] - updateProductQuantity', payload: ICartProduct } |
{ type: '[Cart] - removeCartProduct', payload: ICartProduct } |
{ type: '[Cart] - load address from cookies', payload: shippingAddress } |
{ type: '[Cart] - update address', payload: shippingAddress } |
{
    type: '[Cart] - updateCartSummary', payload: {
        totalItems: number,
        subTotal: number,
        total: number
    }
} |
{
    type: '[Cart] - order complete'
}

export const CartReducer = (state: CartState, action: CartActionType): CartState => {

    switch (action.type) {
        case '[Cart] - loadCart from cookies | storage':
            return {
                ...state,
                isLoaded: true,
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

        case '[Cart] - updateCartSummary':
            return {
                ...state,
                ...action.payload
            }

        case '[Cart] - update address':
        case '[Cart] - load address from cookies':
            return {
                ...state,
                shippingAddress: action.payload
            }
        case '[Cart] - order complete':
            return {
                ...state,
                cart: [],
                totalItems: 0,
                subTotal: 0,
                taxes: 0,
                total: 0,
            }
        default:
            return state;
    }
}