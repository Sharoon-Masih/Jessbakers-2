"use client"
import React from 'react'
import { Card, CardContent } from './ui/card'
import Image from 'next/image'
import { HiOutlineStar, HiStar } from 'react-icons/hi2'
import { Iproduct } from '@/lib/interfaces'
import { useState } from 'react'
import { CarouselSkeleton } from './carouselSkeleton'
import { SingleItemCard } from './singleItem'
import { usePathname, useRouter } from 'next/navigation'
import CardSkeleton from './cardSkeleton'

const ItemCard = ({ Item,currentUserId }: { Item: Iproduct,currentUserId:string }) => {
    const [isRating, SetisRating] = React.useState<boolean>(false)
    const Route = useRouter();
    const pathName = usePathname()
    React.useEffect(() => {

        SetisRating(true)
    }, [])
    let total: number = 5
    let noOfFullStar: number = Math.ceil(Math.random() * (5 - 1) + 1)
    let emptyStarCount: number = total - noOfFullStar
    return (
        isRating ?
            <div >
                <SingleItemCard Item={Item} currentUserId={currentUserId}>
                    <Card className="h-[370px]  w-[300px] hover:ring hover:ring-[#FBEDCD] hover:transition duration-100 ">
                        <CardContent className="flex flex-col aspect-square items-start justify-center p-6 gap-1">
                            <div className=" w-full rounded-sm border h-[250px] relative flex justify-center items-center">
                             {Item.Img ? <Image src={Item.Img} alt={Item.name} fill={true} priority /> : null}
                            </div>
                            <h3 className="text-[18px] text-[#000000] font-normal truncate w-full">{Item.name}</h3>
                            <div className="w-full flex justify-between items-center text-[#000000] font-medium"><span>Price:</span><span>{Item.price}</span></div>
                            <div className="flex items-center justify-center gap-1">{noOfFullStar && Array.from({ length: noOfFullStar }).map((_, idx) => <HiStar className="text-yellow-500" key={idx} />)
                            }{emptyStarCount !== 0 && Array.from({ length: emptyStarCount }).map((_, idx) => <HiOutlineStar className="text-yellow-500" key={idx} />)}</div>
                        </CardContent>
                    </Card>
                </SingleItemCard></div> : <CardSkeleton />
    )
}

export default ItemCard