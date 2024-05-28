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
import { FadeInForText, dropDown, dropup, expand } from '@/lib/motion';
import { PhoneBar } from './phonebar';
import { client } from '../../sanity/lib/client';
import { Cart } from './Cart';



export const poppins = Poppins({ weight: ["500", '600', '700', '800', '900'], style: "normal", subsets: ["latin"] })
const Navbar = () => {
    const [categories, Setcategories] = useState<{ _id: string, name: string, "slug": string }[] | null>(null)
    useEffect(() => {
        const getCategoryData = async () => { //remember kay jab be hum kisi function ko async bnadetay hain toh wo promise return krta hi krta hai chahay phr vo void kiu na ho, wo iss liya bcuz function async hai toh agr hum yebi sochay na kay like fetchData may pehla await krka promise ko resolve kia hai phr usko return kr rha hun toh jo expected output hai wo simple data hona chaiya na kay ek promise ki form ma data ho toh uski yehi waja hakay jo humara func hai wo async hai iss lia wo promise return krega hi krega. 
            const query = `*[ _type == "category" ]{
              _id,
              name,
              "slug" : slug.current
            }`

            const fetchData: { _id: string, name: string, "slug": string }[] = await client.fetch(query);
            Setcategories(fetchData) //acha yaha ek ques hai wo yeh kay jasa jo "categories" state variable hai wo toh srf "{_id:string,name:string} | null" yeh type accept kr rha hai but fetchData "{_id:string,name:string,"slug":string}" ma toh humna ek excess property di hai "slug"  but "Setcategories(fetchData)" error nhi de rha wo iss lia bcuz as we know jo typescript hai usme stale object and fresh object ka ek mechanism hota ab yaha wohi ho rha haka jab humara categories ka array of object "const [categories,Setcategories]=useState<{_id:string,name:string}[] | null>({_id:"sfhgf",name:"cake"})" yaha par initialize hoga ya "Setcategories([{_id:"st33",name:"str","slug":"afass"}])" iss tarah sa agr "set hogi categories" ki value toh at that time excess property denga toh wo error dega bcuz its a fresh object but agr "Setcategories(fetchData)" iss tarah sa denga object toh error nhi ayega kiu kay hum "categories" ko koi fresh object nhi assign kr rhay balka stale object assign kr rhay hain toh as we know that it accepts excess property when we assign stale object.(note:later on humna "slug" add krdi thi bcuz we have to use it but agr na be krtay toh error nhi ata as we read above.)
            return fetchData

        }
        getCategoryData()
    }, [])
    const Path = usePathname();
    const [close, Setclose] = useState<boolean>(false)
    const [click, Setclick] = useState<boolean | null>(null)

    return (
        <header className='mx-2 mt-2 md:mx-4 lg:mr-4 lg:mx-0 md:mt-5 border bg-white h-[75px] border-b border-[#56B280] border-opacity-20 z-[50] sticky top-2 md:top-5 ' >
            <div className='2xl:max-w-[1280px] w-[95%] lg:max-w-screen h-full mx-auto flex justify-between items-center'>
                <span className={`text-[20px] sm:text-[25px] md:text-[30px] font-medium tracking-[9%] text-[#4A1D1F] ${poppins.className} uppercase truncate`}>
                    Jess bakers
                </span>
                <nav>
                    <div className='hidden lg:flex justify-between items-center gap-[46px] '>
                        {
                            NavItems.map((item, idx) => idx === 1 ? <div key={item.id} className='hover:text-[#4A1D1F] text-[16px] font-medium    text-gray-950 flex justify-between items-center cursor-pointer  relative ' onMouseOver={() => { Setclick(true) }} onMouseOut={() => { Setclick(false) }}>{item.name}<span ><ChevronsDown className='w-[18px] h-[18px] ' /></span>{click ?
                                <motion.div
                                    variants={dropDown}
                                    initial="hidden"
                                    whileInView="show"
                                    className='absolute left-0 top-[40px] right-0 min-h-[300px] w-[200px]  rounded-md bg-white ring ring-[#FBEDCD] flex flex-col items-center justify-start divide-y py-4'>
                                    {categories && categories.map((item, idx) => <Link href={`/category/${item.name}`} key={idx}><motion.div
                                        variants={FadeInForText(1 * idx / 2)}
                                        initial="hidden"
                                        whileInView="show"
                                        viewport={{ once: true }}
                                        className='  flex justify-center items-center p-2 w-[170px]'>
                                        {item.name}
                                    </motion.div></Link>)}

                                </motion.div> : click === false &&
                                <motion.div
                                    variants={dropup}
                                    initial="hidden"
                                    whileInView="show"
                                    className='absolute left-0 top-[40px] right-0 h-[300px] w-[200px]  rounded-md bg-white ring ring-[#FBEDCD] '>
                                    {/* {categories && categories.map((item) =><div>{item.name}</div>)} */}

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
                        <button type='submit' className=' xl:hidden w-[25px] h-[25px] sm:h-[45px] sm:w-[45px] flex justify-center items-center bg-[#4A1D1F] ' onClick={() => { Setclose((prev) => !prev) }}>
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
                            <Cart />
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

export default Navbar;

