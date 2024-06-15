import React from 'react'
import { Skeleton } from './ui/skeleton'

const CartSkeleton = () => {
    return (
    <div className="flex w-full h-full justify-center items-center relative flex-col gap-5">
        <Skeleton className="h-4 w-[90%]" />
        <Skeleton className="h-4 w-[70%]" />
    </div>
    )
}

export default CartSkeleton