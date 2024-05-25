import React from 'react'
import { poppin } from '../lib/font'
import { Icons, NavItems } from '@/lib/const'
import Image from 'next/image'

const Footer = () => {
  return (
    <section className={`${poppin.className} text-[#4A1D1F] bg-[#FBEDCD] pt-[66px] lg:pt-[96px] px-4`} id='about'>
      <div className='2xl:max-w-[1280px] mx-auto h-[298px]'>
        <div className='flex justify-center md:justify-between items-center pb-[35px]'>
          <strong className='uppercase text-[30px] font-medium tracking-[9%]'>Jess bakers</strong>
          <ul className='hidden md:flex justify-between items-center text-[20px] gap-[48px] font-medium text-[#272727]'>
            {NavItems.map((item) => <li key={item.id}>{item.name}</li>)}
          </ul>
        </div>
        <div className='bg-[#4A1D1F] h-[0.5px] bg-opacity-25' />
        <div className='flex flex-col md:flex-row items-center justify-between pt-[35px] gap-4'>
          <h3 className='text-[16px] font-medium text-[#272727] '>© 2024 Jess Bakers. All rights reserved.</h3>
          <ul className='flex justify-between items-center text-[20px] gap-[28px] font-medium text-[#272727]'>
            {Icons.map((item) => <li key={item.name}>
              <Image src={item.src} width={24} height={24} alt={item.name} /></li>)}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Footer