import { createContext, useContext } from 'react'

export const AuthContext = createContext({ userId: '' })



export function useUserId() {
    return useContext(AuthContext)
}