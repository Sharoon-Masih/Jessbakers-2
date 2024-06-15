'use client'
import React, { ReactNode } from 'react'
import { AuthContext } from './authContext'

const AuthProvider = ({ children }: { children: ReactNode }) => {

    return (
        <AuthContext.Provider value={{ userId: '' }}> {/*yaha mena jo createContext ma default value ma as a obj set kia tha {userId:""} yaha value ma wohi obj pass kia or phr same name ka variable userId assign krdia object ma toh usko automatically smjh agyi iska ilawa ma explicitly be value={{userId:userId}} set krskta tha. */}

            {/* ab jasay mana yaha provider ma value update krdi userId ki toh ab jo be components as a children within this Provider ayengay unko wo value mil jayegi userId ki or ab yeh krnay kay liya just muja iss AuthProvider component ko wrap krna hoga unko components pa jinko userId chaiya otherwise agr puri app ma chaiya toh ma direct layout ma jaka waha body mabi children ko wrap krskta hun. */}

            {children}

        </AuthContext.Provider>
    )
}

export default AuthProvider