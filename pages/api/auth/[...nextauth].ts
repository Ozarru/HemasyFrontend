import NextAuth,{NextAuthOptions} from 'next-auth'
import CredentialProvider from 'next-auth/providers/credentials'

const authOptions: NextAuthOptions ={
    session:{
        strategy: 'jwt'
    },
    providers:[
        CredentialProvider({
            name: 'credentials',
            credentials:{
                username: {label: 'Email', type:'email', placeholder:'exp@email.com'},
                password: {label: 'Password', type:'password'}
            },
            authorize:(credentials) =>{
               if(credentials.username === 'dockodom@cik.com' && credentials.password === 'dockodom'){
                return{
                    id:1,
                    name:'Koffi'
                }
               }

               return null
            }

        })
    ]
}
export default NextAuth(authOptions)