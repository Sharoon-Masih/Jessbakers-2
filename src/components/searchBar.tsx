'use client'
import { expand } from '@/lib/motion'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'
import { Input } from './ui/input'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
const SearchBar = ({ close, Setclose }: { close: boolean, Setclose: (callback: (prev: boolean) => boolean) => void }) => {
    // const [close, Setclose] = useState<boolean>(false)
    // const [value, Setvalue] = useState("Search")
    const Route: AppRouterInstance = useRouter();
    const SearchParams = useSearchParams();
    const handleSearch = useDebouncedCallback((query: string) => {
        const params = new URLSearchParams(SearchParams)
        if (query) {
            params.set('item', query)
        }
        else {
            params.delete('item')
            Route.refresh();
        }
        Route.replace(`/menu?${params.toString()}`)
        console.log(params);
        console.log(params.toString());
    }, 300)
    return (
        <div className='xl:w-[251px] h-full flex justify-between items-center'>
            {/* this will show on xl screen */}
            <Input className='hidden xl:block h-[45px] rounded-none focus:outline-none active:outline-none border-[#4A1D1F] box-border text-[16px] text-[#B4B4B4]' placeholder='Search' onChange={(e) => handleSearch(e.target.value)} />

            {/* this will show on all screen before xl*/}
            {close && <motion.input
                variants={expand(true)}
                initial="hidden"
                whileInView={"show"}
                className='block xl:hidden w-[100px] sm:w-auto h-[25px] sm:h-[45px] rounded-none focus:outline-none active:outline-none border-[#4A1D1F] box-border text-[#B4B4B4] truncate ' placeholder='Search'  onChange={(e) => handleSearch(e.target.value)} />}

            {/* this btn will show on all screen before xl*/}
            <button type='submit' className=' xl:hidden w-[25px] h-[25px] sm:h-[45px] sm:w-[45px] flex justify-center items-center bg-[#4A1D1F] ' onClick={() => { Setclose((prev) => !prev) }} >
                <Search className='w-[16px] h-[16px] text-[#FBEDCD]' />
            </button>
            {/* this btn will show on xl screen*/}
            <button type='submit' className=' hidden w-[25px] h-[25px] sm:h-[45px] sm:w-[45px] xl:flex justify-center items-center bg-[#4A1D1F] '>
                <Search className='w-[16px] h-[16px] text-[#FBEDCD]' />
            </button>
        </div>
    )
}

export default SearchBar