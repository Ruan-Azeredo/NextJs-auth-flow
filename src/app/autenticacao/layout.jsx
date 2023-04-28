'use client'

import { AuthContext } from '@/contexts/Auth'
import { useRouter } from 'next/navigation'
import React, { useContext, useEffect } from 'react'
import nookies from "nookies"

const autenticacaoLayout = ({ children }) => {

    const router = useRouter()

    useEffect(() => {
        const { ['auth-cookie-test']: token } = nookies.get()

        if (token) {
            router.push('/sistema/dashboard')
        }
    }, [])
    

    return (
        <div>{children}</div>
    )
}

export default autenticacaoLayout