'use client'

import { AuthContext } from '@/contexts/Auth'
import { useRouter } from 'next/navigation'
import nookies, { parseCookies } from 'nookies'
import React, { useContext, useEffect } from 'react'

const sistemaLayout = ({ children }) => { 

    const { verifyToken } = useContext(AuthContext)

    const router = useRouter()

    useEffect(() => {
        const { ['auth-cookie-test']: token } = nookies.get()

        if (!token) {
            router.push('/autenticacao/login')
        } else{
            verifyToken(token)    
        }
    }, [])
    
    return (
        <div>{children}</div>
    )
}

// export async function getServerSideProps(ctx) {
//     console.log(ctx.req.cookies)
//     console.log('ctx:', ctx)
    
//     const test = 5
//     console.log('test', test)
    
//     const token = nookies.get(ctx).token
//     console.log('server-token:', token)

//     if (!token) {
//         return {
//             props: {}
//         }
//     }

//     try {
//         const user = await verifyToken(token)
//         console.log('server-user',user)
//         return {
//             props: {user}
//         }
//     } catch (error) {
//         console.log('server-error',error)
//         nookies.destroy(ctx, 'auth-cookie-test')
//         return {
//             props: {}
//         }
//     }



    // console.log(req.cookies)

    // const { authData } = useContext(AuthContext)

    // const router = useRouter()

        
    // const { ['auth-cookie-test']: token } = parseCookies(ctx)
    // console.log('token:', token)
    // console.log('authData', authData)

    // if (!token) {
    //     return {
    //         redirect: {
    //           destination: '/',
    //           permanent: false,
    //         }
    //     }
    // }

    // return {
    //     props: {}
    // }
// }

export default sistemaLayout