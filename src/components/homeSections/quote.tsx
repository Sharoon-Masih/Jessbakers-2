import React from 'react'

const Quote = () => {
    return (
        <section>
            <div className='2xl:max-w-[1280px] mx-auto flex justify-center items-center   text-[#4A1D1F] py-[56px] lg:py-[96px] '>
                <div className='flex md:items-center flex-col lg:flex-row justify-center w-full md:gap-[46px] lg:gap-[56px] px-4'>
                    <h2 className='text-[28px] md:text-[48px] font-bold h-[72px] truncate '>Try Our Best Selling</h2>
                    <div className='flex gap-5 md:gap-[30px] lg:gap-[56px] h-[80px] relative md:h-[99px]  justify-between items-center '>
                    <div className=' w-[3px] h-full bg-opacity-70 bg-[#4A1D1F]' />
                    <div className='text-[#272727] text-[12px] md:text-[22px] lg:w-[450px] xl:w-[640px]  flex justify-end  '><p className=' w-fit'>Here’s our best creations that everyone loves. Lightness and sweetness of the cake make you want more and more. Start from cake, bread and other creations.</p></div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Quote