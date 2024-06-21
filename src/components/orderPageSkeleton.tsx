import React from 'react'
import { Skeleton } from './ui/skeleton'

const CardSkeleton = () => {
  return (
    <div className='2xl:max-w-[1280px] mx-auto h-full py-[30px] lg:py-[40px] px-4 '>
    <Skeleton className="h-4 w-[90%]" />
    <Skeleton className="h-4 w-[70%]" />
  </div>
  )
}

export default CardSkeleton