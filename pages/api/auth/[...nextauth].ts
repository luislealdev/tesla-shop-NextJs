import { dbUsers, db } from '@/database';
import NextAuth, { NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"
declare module "next-auth" {
    interface Session {
        accessToken?: string;
    }
}



export const authOptions: NextAuthOptions = {
    // Configure one or more authentication providers
    providers: [
        Credentials({
            name: 'Custom Login',
            credentials: {
                email: { label: 'correo', type: 'email', placeholder: 'correo@google.com' },
                password: { label: 'password', type: 'password', placeholder: 'password' },
            },
            async authorize(credentials) {
                console.log({ credentials });

                return await dbUsers.checkUserEmailPassword(credentials!.email, credentials!.password);

            }
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID || '',
            clientSecret: process.env.GITHUB_SECRET || '',
        }),
        // ...add more providers here
    ],

    pages:{
        signIn:'/auth/login',
        newUser:'/auth/register'
    },

    jwt: {

    },

    callbacks: {
        async jwt({ token, account, user }) {
            if (account) {
                token.accessToken = account.access_token;

                switch (account.type) {
                    case 'oauth':
                        token.user = await dbUsers.oAuthToDB(user?.email || '', user?.name || '');
                        break;
                    case 'credentials':
                        token.user = user;
                        break;
                    default:
                        break;
                }
            }
            return token;
        },

        async session({ session, token, user }) {
            session.accessToken = token.accessToken as any;
            session.user = token.user as any;

            return session;
        }
    }
}

export default NextAuth(authOptions)