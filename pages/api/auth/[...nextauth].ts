import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import GithubProvider from "next-auth/providers/github"

export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        Credentials({
            name: 'Custom Login',
            credentials: {
                email: { label: 'correo', type: 'email', placeholder: 'correo@google.com' },
                password: { label: 'password', type: 'password', placeholder: 'password' },
            },
            async authorize(credentials, req) {
                console.log({ credentials });

                return { name: 'Juan', correo: 'yolo@gmail.com', role: 'admin' }

            }
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID || '',
            clientSecret: process.env.GITHUB_SECRET || '',
        }),
        // ...add more providers here
    ],

    jwt: {

    },

    callbacks: {

    }
}

export default NextAuth(authOptions)