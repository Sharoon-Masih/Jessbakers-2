"use client"
import React from 'react'
import {IheroSection} from "../lib/interfaces"
import Image from 'next/image'
import {urlForImage} from '../../sanity/lib/image'
import {motion} from 'framer-motion'
import { FadeIn } from '@/lib/motion'

const FeaturedImgsFade = ({Data}:{Data:IheroSection[]}) => {
  return (
    Data[0].featuredImgs.map((image, idx) => <motion.div 
    variants={FadeIn(1*idx)}
    initial="hidden"
    whileInView="show"
    viewport={{once:true}}
    className='w-[230px] h-[129px] relative ' key={idx}>
    <Image src={urlForImage(image)} fill={true} alt={`img-${idx}`} priority={true} className='object-center object-cover ' />
  </motion.div>)
  )
}

export default FeaturedImgsFade