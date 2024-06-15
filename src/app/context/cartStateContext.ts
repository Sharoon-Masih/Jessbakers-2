import { Dispatch, SetStateAction, createContext, useContext } from 'react'

export const CartStateContext = createContext<{isAddToCart:boolean,SetisAddToCart:Dispatch<SetStateAction<boolean>>} | null>(null)


export function useAddToCart() {
    return useContext(CartStateContext)
}