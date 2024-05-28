import { Iproduct } from '@/lib/interfaces'
import React from 'react'
import ItemCard from '@/components/itemCard'
import { client } from '../../../sanity/lib/client'

const getMenuData = async () => {
    const query = `*[ _type == "product"]{
        name,
         _id,
         weight,
          price,
          "slug":slug.current,
         "Img": images[0].asset -> url,
         price_id,
         "category": category -> name
        
       }`

    const fetchData: Iproduct[] = await client.fetch(query);
    return fetchData
}

const Menu = async () => {
    const ItemData:Iproduct[] = await getMenuData()
    return (
        <section className='${poppin.className} text-[#4A1D1F] relative overflow-hidden height' >
            <div className='2xl:max-w-[1280px] mx-auto h-full py-[30px] lg:py-[40px] px-4 '>
                <span className={`text-[18px] sm:text-[20px] md:text-[25px] font-semibold tracking-[9%] text-[#4A1D1F] uppercase truncate`}>
                   All Categorie's
                </span>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center items-center gap-5 z-30 py-[20px] lg:py-[30px]'>{ItemData.map((Item) => <ItemCard Item={Item} />)}</div>
            </div>
        </section>
    )
}

export default Menu