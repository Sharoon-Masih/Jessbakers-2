import React from 'react'
import { IheroSection } from '@/lib/interfaces'
import { client } from '../../../sanity/lib/client'
import { poppin } from '@/lib/font'
import Image from 'next/image'
import { urlForImage } from '../../../sanity/lib/image'
import { ArrowLeft, ArrowRight } from 'lucide-react'

const getHeroData = async () => {
  const query = `*[ _type == "heroSection" && status]{
    mainText,
    _id,
    desc,
    status,
    "heroImg":heroImg.asset -> url,
    featuredImgs
  }`

  const fetchData = await client.fetch(query);
  return fetchData
}
const Hero = async () => {

  const Data: IheroSection[] = await getHeroData()
  return (
    <section className={`min-h-screen relative  ${poppin.className}   overflow-hidden`}>
      <div className='2xl:max-w-[1280px] mx-auto flex h-full items-start md:items-center lg:items-start  lg:justify-between m-auto px-4  lg:px-0  lg:pl-[93px] flex-col lg:flex-row  '>
        {Data[0].status && <div className='pt-[66px] lg:pt-[96px]  z-10 flex flex-col justify-between text-[#4A1D1F] items-center  lg:items-start'>
          <h1 className={`sm:text-center  md:w-[700px]  lg:text-start lg:w-[440px] xl:w-[530px] xl:h-[132] text-[38px] md:text-[44px] font-bold`}>{Data[0].mainText}</h1>
          <p className=' sm:text-center md:w-[700px] lg:text-start pt-[20px] lg:w-[450px]  xl:w-[510px] xl:h-[108px] text-[20px] md:text-[24px] font-normal text-[#272727] '>{Data[0].desc}</p>
        </div>}
        <div className='absolute h-[1019px] w-[1011px] rounded-full bg-[#FBEDCD] shadow-2xl -top-20 left-[90px]  lg:left-[618px] blur-3xl bg-opacity-70 '>
        </div>
        {Data[0].status && <div className='w-[729px] h-[599px] z-10 lg:mt-5 lg:relative xl:left-[111px] '>
          <Image src={Data[0].heroImg} width={500} height={500} alt={Data[0].name} className='w-full object-cover' />
          <div className='hidden md:flex items-center justify-start pl-[32px] absolute w-[965px] h-[201px] bg-[#FFFFFF] rounded-r-full rounded-l-full bottom-0  lg:bottom-[130px]  xl:bottom-[45px] bg-opacity-70 overflow-hidden  xl:-right-[147px]'>
            <div className='flex gap-2 items-center justify-center text-[#4A1D1F] text-xl font-normal'>
              <ArrowLeft className='font-normal' />
              <span>01/<sup>12</sup></span>
              <ArrowRight className='font-normal' />
            </div>
            <div className='flex items-center justify-center'>
              {Data[0].featuredImgs.map((image, idx) => <div className='w-[230px] h-[129px] relative ' key={idx}>
                <Image src={urlForImage(image)} fill={true} alt={`img-${idx}`} className='object-center object-cover ' />
              </div>)}
            </div>
          </div>
        </div>}
      </div>

    </section>
  )
}

export default Hero;