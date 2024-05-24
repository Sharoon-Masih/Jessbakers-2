"use client"
import React, { useEffect, useState } from 'react'
import { Poppins } from 'next/font/google';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { NavItems } from '@/lib/const';
import { ChevronsDown, ChevronsDownUp, ChevronsUpDown, Search, ShoppingCartIcon } from 'lucide-react';
import { Input } from './ui/input';
import { AvatarIcon } from '@radix-ui/react-icons';
import { motion } from "framer-motion"
import { dropDown, dropup, expand } from '@/lib/motion';
import { PhoneBar } from './phonebar';

export const poppins = Poppins({ weight: ["500", '600', '700', '800', '900'], style: "normal", subsets: ["latin"] })
const Navbar = () => {
    const Path = usePathname();
    const [close,Setclose]= useState<boolean>(false)
    const [click, Setclick] = useState<boolean | null>(null)
    
    return (
        <header className='mx-2 mt-2 md:mx-4 lg:mr-4 lg:mx-0 md:mt-5 border bg-white h-[75px] border-b border-[#56B280] border-opacity-20 z-[50] sticky top-2 md:top-5 ' >
            <div className='2xl:max-w-[1280px] w-[95%] lg:max-w-screen h-full mx-auto flex justify-between items-center'>
                <span className={`text-[20px] sm:text-[25px] md:text-[30px] font-medium tracking-[9%] text-[#4A1D1F] ${poppins.className} uppercase truncate`}>
                    Jess bakers
                </span>
                <nav>
                    <div className='hidden lg:flex justify-between items-center gap-[46px]'>
                        {
                            NavItems.map((item, idx) => idx === 1 ? <div key={item.id} className='hover:text-[#4A1D1F] text-[16px] font-medium    text-gray-950 flex justify-between items-center cursor-pointer  relative ' onMouseOver={() => { Setclick(true) }} onMouseOut={()=>{Setclick(false)}}>{item.name}<span ><ChevronsDown className='w-[18px] h-[18px] ' /></span>{click ?
                                <motion.div
                                    variants={dropDown}
                                    initial="hidden"
                                    whileInView="show"
                                    className='absolute left-0 top-[40px] right-0 h-[300px] w-[200px]  rounded-md bg-white ring ring-[#FBEDCD]'>

                                </motion.div> : click === false &&
                                <motion.div
                                    variants={dropup}
                                    initial="hidden"
                                    whileInView="show"
                                    className='absolute left-0 top-[40px] right-0 h-[300px] w-[200px]  rounded-md bg-white ring ring-[#FBEDCD]'>

                                </motion.div>
                            }</div>
                                : Path === item?.path ? <Link key={item.id}
                                    href={item?.path}><span className={`${poppins.className} hover:text-[#4A1D1F] text-[16px] font-semibold  text-[#4A1D1F]`}>{item.name}</span></Link> : <Link key={item.id}
                                        href={item?.path}> <span className={`${poppins.className} hover:text-[#4A1D1F] text-[16px] font-medium  text-gray-950`}>{item.name}</span></Link>)
                        }

                    </div>

                </nav>
                <div className='w-auto gap-3 lg:gap-31 h-[45px] xl:w-[376px] flex justify-between items-center ' >
                    <div className='xl:w-[251px] h-full flex justify-between items-center'>
                        {/* this will show on xl screen */}
                        <Input className='hidden xl:block h-[45px] rounded-none focus:outline-none active:outline-none border-[#4A1D1F] box-border text-[16px] text-[#B4B4B4]' placeholder='Search' />

                        {/* this will show on all screen before xl*/}
                        {close && <motion.input 
                        variants={expand(true)}
                        initial="hidden"
                        whileInView={"show"}
                        className='block xl:hidden w-[100px] sm:w-auto h-[25px] sm:h-[45px] rounded-none focus:outline-none active:outline-none border-[#4A1D1F] box-border text-[#B4B4B4] truncate ' placeholder='Search' />}
                         
                        {/* this btn will show on all screen before xl*/}
                        <button type='submit' className=' xl:hidden w-[25px] h-[25px] sm:h-[45px] sm:w-[45px] flex justify-center items-center bg-[#4A1D1F] ' onClick={()=>{Setclose((prev)=>!prev)}}>
                            <Search className='w-[16px] h-[16px] text-[#FBEDCD]' />
                        </button>
                        {/* this btn will show on xl screen*/}
                        <button type='submit' className=' hidden w-[25px] h-[25px] sm:h-[45px] sm:w-[45px] xl:flex justify-center items-center bg-[#4A1D1F] '>
                            <Search className='w-[16px] h-[16px] text-[#FBEDCD]' />
                        </button>
                    </div>

                    {!close && <>
                    <span className='flex justify-center items-center w-[25px]  sm:w-[34px] sm:h-[34px]'>
                        <AvatarIcon className='w-[30px] h-[30px] text-[#272727]' />
                    </span>
                    <span className='flex justify-center items-center w-[25px] sm:w-[34px] sm:h-[34px]'>
                        <ShoppingCartIcon className='w-[30px] h-[30px] text-[#272727]' />
                    </span>
                    <div className='block lg:hidden'>
                        <PhoneBar />
                    </div>
                    </>}
                </div>

            </div>
        </header>
    )
}

export default Navbar