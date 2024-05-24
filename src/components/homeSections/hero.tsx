import React from 'react'
import { IheroSection } from '@/lib/interfaces'
import { client } from '../../../sanity/lib/client'
import { poppin } from '@/lib/font'

const getHeroData = async () => {
   const query=`*[ _type == "heroSection" && status]{
    mainText,
    _id,
    desc,
    status,
    heroImg,
    featuredImgs
  }`

  const fetchData= await client.fetch(query);
  return fetchData
}
const Hero = async () => {
 
  const Data:IheroSection[]= await getHeroData()
  return (
    <section className={`h-screen relative overflow-x-hidden ${poppin.className} lg:overflow-hidden`}>
      <div className='2xl:max-w-[1280px] mx-auto flex h-full items-start justify-between m-auto px-4 pt-[66px] lg:px-0 lg:pt-[96px] lg:pl-[93px] '>
        <div className=' z-10 flex flex-col justify-between text-[#4A1D1F] items-center lg:items-start'>
        <h1 className={`md:text-center  md:w-[700px]  lg:text-start lg:w-[530px] lg:h-[132] text-[44px] font-bold`}>{Data[0].mainText}</h1>
        <p className=' md:text-center md:w-[700px] lg:text-start pt-[20px] lg:w-[510px] lg:h-[108px] text-[24px] font-normal text-[#272727] '>{Data[0].desc}</p>
        </div>
        <div className='absolute h-[1019px] w-[1011px] rounded-full bg-[#FBEDCD] shadow-2xl -top-20 left-[90px]  lg:left-[618px] blur-3xl bg-opacity-[80]'>
        
        </div>
      </div>

    </section>
  )
}

export default Hero