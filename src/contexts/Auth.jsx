'use client'

import { authService } from "@/service/AuthService";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import nookies, { destroyCookie, parseCookies, setCookie } from "nookies"

export const AuthContext = createContext()

export function AuthProvider({ children }) {

    const [authData, setAuthData] = useState(undefined)
    const [error, setError] = useState()
    
    const router = useRouter()

    async function verifyToken(token) {
        
        await authService.recoverUserInfo(token).then(resp => setAuthData(resp))
    }
    
    async function signIn(email, password) {

        try {
            const auth = await authService.signIn(email, password)
            const token = auth.token

            if (auth) {
                setCookie(null, 'auth-cookie-test', token, {
                    maxAge: 60 * 60 * 24 * 30 * 3, // 3 meses
                    path: '/'
                })

                router.push('/sistema/dashboard')
            }
        } catch (error) {
            setError(error)
        }
    }

    function signOut() {

        destroyCookie(null, 'auth-cookie-test', {
            path:'/'
        })
        setAuthData(undefined)
        router.push('/autenticacao/login')
    }

    return (
        <AuthContext.Provider value={{authData, error, signIn, signOut, verifyToken}}>
            {children}
        </AuthContext.Provider>
    )
}