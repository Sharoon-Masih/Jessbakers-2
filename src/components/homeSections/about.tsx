"use client"
import { poppin } from '@/lib/font'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import {motion} from 'framer-motion'
import { Slider } from '@/lib/motion'

const About = () => {
    return (
        <section className={`${poppin.className} text-[#4A1D1F] overflow-hidden`} id='about'>
            <motion.div
            variants={Slider("left",0.5)}
            initial="hidden"
            whileInView="show"
            viewport={{once:true}} 
            className='2xl:max-w-[1280px] mx-auto flex flex-col lg:flex-row justify-between min-h-[347px] items-center   text-[#4A1D1F] pt-[66px] lg:pt-[96px] relative px-4 md:gap-4  lg:gap-0'>
                <div className='flex flex-col lg:w-[587px] lg:h-full items-start md:items-center lg:items-start justify-between gap-2'>
                    <h1 className='text-[34px] md:text-center  lg:text-start md:text-[44px] font-medium'>We Bake for you
                        Fresh From the oven</h1>
                    <p className='text-base md:text-center lg:text-start md:text-lg font-normal text-[#272727]'>We use quality materials that we get directly from farmers.
                        our backers are exeperienced people in the food sector. So
                        that the products we produce are guaranteed quality and
                        taste. It’s so delicious, you have to try it!</p>
                    <span className='mt-5 flex gap-1 text-[20px] md:hidden lg:flex font-normal items-center justify-between'>Read More <ArrowRight /></span>
                </div>
                <div className='w-full h-[347px]  lg:w-[617px] lg:h-[347px] relative'>
                    <Image src={"/pic1.png"} fill={true} alt={"aboutPic"} />
                </div>
            </motion.div>
             <motion.div
            variants={Slider("right",0.7)}
            initial="hidden"
            whileInView="show"
            viewport={{once:true}}  className='2xl:max-w-[1280px] mx-auto flex flex-col-reverse lg:flex-row justify-between min-h-[347px] items-center   text-[#4A1D1F] py-[66px] lg:py-[96px] relative px-4 md:gap-4  lg:gap-0'>

                <div className='w-full h-[347px]  lg:w-[617px] lg:h-[347px] relative'>
                    <Image src={"/pic1.png"} fill={true} alt={"aboutPic"} />
                </div>
                <div className='flex flex-col lg:w-[587px] lg:h-full items-start md:items-center lg:items-start justify-between gap-2'>
                    <h1 className='text-[34px] md:text-center  lg:text-start md:text-[44px] font-medium'>Come and choose
                        your favourites</h1>
                    <p className='text-base md:text-center lg:text-start md:text-lg font-normal text-[#272727]'>Try to come to our shop directly to enjoy the delicious taste
                        of the cake that just came out of the oven. While enjoying it
                        with a cup of coffee or tea in our very convenient shop. very
                        suitable for chatting, meeting with your team.</p>
                    <span className='mt-5 flex gap-1 text-[20px] md:hidden lg:flex font-normal items-center justify-between'>Read More <ArrowRight /></span>
                </div>
            </motion.div>
        </section>
    )
}

export default About