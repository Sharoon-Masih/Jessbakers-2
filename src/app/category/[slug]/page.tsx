import HeroSec from '@/components/categorySections/hero'
import React from 'react'
import { client } from '../../../../sanity/lib/client';
import { Iproduct } from '@/lib/interfaces';
import { auth } from '@clerk/nextjs/server';

const getProductData = async (category: string) => {
    const query = `*[ _type == "product" && category -> name == '${category}']{
        name,
         _id,
         weight,
          price,
          "slug":slug.current,
         "Img": images[0].asset -> url,
         price_id,
         "category": category -> name
        
       }`

    const fetchData:Iproduct[] = await client.fetch(query);
    return fetchData
}

const categoryPage = async ({params}:{params:{slug:string}}) => {
     const ItemData:Iproduct[] = await getProductData(params.slug)
     const {sessionClaims}=auth()
     const currentUserId=sessionClaims?.userId as string
    return (
        <main className='height '>
         {ItemData &&  <HeroSec ItemData={ItemData} currentUserId={currentUserId}/>}
        </main>
    )
}

export default categoryPage