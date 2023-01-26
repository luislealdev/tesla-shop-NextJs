import { createContext } from 'react';
import { IUser } from '../../interfaces/user';


interface ContextProps {
    isLoggedIn: boolean,
    user?: IUser,

    //Methods
    onLoginUser: (email: string, password: string) => Promise<boolean>
    onRegisterUser: (name: string, email: string, password: string) => Promise<{
        hasError: boolean;
        message?: string;
    }>
    onLogout: () => void
}

export const AuthContext = createContext({} as ContextProps);