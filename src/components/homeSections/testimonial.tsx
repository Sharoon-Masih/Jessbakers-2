import { poppin } from '@/lib/font'
import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'

const Testimonial = () => {
    return (
        <section className={`${poppin.className} text-[#4A1D1F] `} id='about'>
            <div className='2xl:max-w-[1280px] mx-auto py-[66px] lg:py-[96px] flex-col min-h-[586px]  items-center justify-between flex relative  px-4 gap-[70px]' >
                <div className='flex-col items-center justify-center md:justify-start flex'>
                    <div className='w-[64px] h-[22px] rounded-[36px] bg-[#FBEDCD] text-[#4A1D1F]'>QUOTES</div>
                    <div className='absolute left-[102px]  w-[90px] h-[80px] lg:w-[142px] lg:h-[98px]'>
                        <Image src={'/openQuote.svg'} fill={true} alt='OpenQuote' />
                    </div>
                    <p className='pt-[60px] lg:pt-0 text-[18px] sm:text-[28px] text-[#272727] text-center font-semibold lg:text-[48px] z-10 lg:w-[977px] lg:h-[180px]'>the eggless cakes here are really good. Had ordered a kit kat cake which was really good. Surely worth a try.</p>
                    <div className= 'w-[90px] h-[80px] lg:w-[142px] lg:h-[98px] absolute top-[234px] right-[102px]'>
                        <Image src={'/closeQuote.svg'} fill={true} alt='CloseQuote' />
                    </div>
                </div>
                <div className='flex flex-col gap-5 items-center justify-between'> 
                <div className='w-[88px] h-[88px] rounded-full border relative overflow-hidden '>
                  <Image src={"/output-onlinetools.png"} fill={true} alt='Sharoon Masih' className='object-cover object-center'/>
                </div>
                <strong className='text-[24px] font-semibold '>Sharoon Masih</strong>
                <strong className='text-[#272727] font-medium text-18px -mt-3'>CO-Founder at Techverse51</strong>
                </div>
            </div>
        </section>
    )
}

export default Testimonial