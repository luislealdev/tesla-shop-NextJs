import { CartState } from './CartProvider';
import { ICartProduct } from '../../interfaces/cart';

type CartActionType = |
{ type: '[Cart] - loadCart from cookies | storage' } |
{ type: '[Cart] - addItemToCart', payload: ICartProduct }

export const CartReducer = (state: CartState, action: CartActionType): CartState => {

    switch (action.type) {
        case '[Cart] - loadCart from cookies | storage':
            return {
                ...state,
            }

        case '[Cart] - addItemToCart':
            return {
                ...state,
            }

        default:
            return state;
    }
}