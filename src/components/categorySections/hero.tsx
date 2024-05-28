import { Iproduct } from '@/lib/interfaces'
import React from 'react'
import ItemCard from '../itemCard'

const HeroSec = ({ ItemData }: { ItemData: Iproduct[] }) => {
  return (
    <section className='${poppin.className} text-[#4A1D1F] relative overflow-hidden height' >
      <div className='2xl:max-w-[1280px] mx-auto h-full py-[30px] lg:py-[40px] px-4 '>
        <span className={`text-[18px] sm:text-[20px] md:text-[25px] font-semibold tracking-[9%] text-[#4A1D1F] uppercase truncate`}>
          {ItemData[0].category}&apos;S
        </span> 

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center items-center gap-5 z-30 py-[20px] lg:py-[30px]'>{ItemData.map((Item) => <ItemCard Item={Item} key={Item._id}/>)}</div>
      </div>
    </section>
  )
}

export default HeroSec