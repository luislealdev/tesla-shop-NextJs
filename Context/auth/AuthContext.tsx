import { createContext } from 'react';
import { IUser } from '../../interfaces/user';


interface ContextProps {
    isLoggedIn: boolean,
    user?: IUser,

    //Methods
    onLoginUser: (email: string, password: string) => Promise<boolean>
}

export const AuthContext = createContext({} as ContextProps);