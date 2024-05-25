"use client"
import { poppin } from '@/lib/font'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { ContactCard } from '../contactCard'

const Contact = () => {
    const [isClick,SetisClick]=useState<boolean | null>(null)
    return (
        <section className={`${poppin.className} text-[#4A1D1F] bg-[#FBEDCD] mt-[66px] lg:mt-[96px] px-4 py-4`} id='contact'>
            <div className='2xl:max-w-[1280px] mx-auto flex flex-col items-start sm:items-center justify-center gap-[30px] lg:gap-[47px] min-h-[367px]' >
                <h1 className='text-[30px] md:text-[36px]  font-bold'>For Cake Orders above 1 POUND</h1>
                <p className='text-[#272727] text-base md:text-[20px] font-medium text-start sm:text-center'>Please visit our nearest store or
                    call us on +91 00 00 00 00 00 (10 AM to 7 PM)
                    to place your orders.</p>
                <Button className='bg-[#4A1D1F] w-[165px] h-[46px] sm:w-[201px] sm:h-[56px] rounded-[6px] flex justify-center items-center text-[#F0FDF4] text-[18px] font-medium '    onClick={()=>{SetisClick((prev)=>!prev)}}>Contact Us Now</Button>
                {isClick && <div className='w-full flex justify-center items-center'> <ContactCard Click={SetisClick}/></div>}
            </div>
        </section>
    )
}

export default Contact