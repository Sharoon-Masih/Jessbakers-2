import React from 'react'
import { Skeleton } from './ui/skeleton'

const CardSkeleton = () => {
  return (
    <div className='h-[370px] w-[300px] flex justify-center items-center relative flex-col gap-3'>
    <Skeleton className="h-4 w-[90%]" />
    <Skeleton className="h-4 w-[70%]" />
  </div>
  )
}

export default CardSkeleton