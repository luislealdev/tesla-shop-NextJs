import { AuthState } from './AuthProvider';
import { IUser } from '../../interfaces/user';

type AuthActionType = | { type: '[Auth] - login', payload: IUser }

export const AuthReducer = (state: AuthState, action: AuthActionType): AuthState => {

    switch (action.type) {
        case '[Auth] - login':
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload
            }

        default:
            return state;
    }
}