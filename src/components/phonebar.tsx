"use client"


import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "./ui/button"
import { ChevronsDown, MenuIcon } from "lucide-react"
import { NavItems } from "@/lib/const"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { poppins } from "./navbar"
import { dropDown, dropup } from "@/lib/motion"

export function PhoneBar() {
    const Path = usePathname();
    const [click, Setclick] = useState<boolean | null>(null)
    const [menuclick, Setmenuclick] = useState<boolean>(false)
    useEffect(() => {
        Setclick(null);
    },[menuclick])
    return (


        <Sheet>
            <SheetTrigger >
            <Button onClick={()=>{Setmenuclick((prev)=>!prev)}} variant="outline" className=" flex justify-center items-center w-[25px]  sm:w-[34px] sm:h-[34px] p-0 outline-none" asChild><MenuIcon className="w-[30px] h-[30px] text-[#272727] " /></Button>
            </SheetTrigger>
            <SheetContent side={"top"} className="h-auto bg-[#FBEDCD] w-full ">
                <ul className='flex flex-col gap-2  justify-between items-center   divide-[#272727] relative '>
                    {
                        NavItems.map((item, idx) => idx === 1 ? <li key={item.id} className='hover:text-[#4A1D1F] text-[16px] font-medium    text-gray-950 flex flex-col justify-between items-center cursor-pointer w-full  ' onClick={() => { Setclick((prev) => !prev) }}>
                            <div className="flex justify-center items-center">{item.name}<span ><ChevronsDown className='w-[18px] h-[18px] ' /></span></div>{click ?
                                <motion.div
                                    variants={dropDown}
                                    initial="hidden"
                                    whileInView="show"
                                    className=' h-[300px] w-full  '>

                                </motion.div> : click === false && <motion.div
                                    variants={dropup}
                                    initial="hidden"
                                    whileInView="show"
                                    className=' h-[300px] '>

                                </motion.div>
                            }</li>
                            : Path === item?.path ? <Link key={item.id}
                                href={item.path} ><li className={`${poppins.className} hover:text-[#4A1D1F] text-[16px] font-semibold  text-[#4A1D1F] w-full `}>{item.name}</li></Link> : <Link key={item.id}
                                    href={item.path}> <li className={`${poppins.className} hover:text-[#4A1D1F] text-[16px] font-medium  text-gray-950 w-full`}>{item.name}</li></Link>)
                    }

                </ul>
            </SheetContent>
        </Sheet>


    )
}
