'use client'
import React, { ReactNode, useState } from 'react'
import { CartStateContext } from './cartStateContext'

const CartStateProvider = ({ children }: { children: ReactNode }) => {
    const [isAddToCart, SetisAddToCart] = useState(false)
    return (
        <CartStateContext.Provider value={{isAddToCart, SetisAddToCart}}>
            {children}
        </CartStateContext.Provider>
    )
}

export default CartStateProvider