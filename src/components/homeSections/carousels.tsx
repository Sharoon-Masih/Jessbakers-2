
"use client"
import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Star, StarHalf } from "lucide-react"
import { CarouselSkeleton } from "../carouselSkeleton"
import { HiStar, HiOutlineStar } from "react-icons/hi2"
import { client } from "../../../sanity/lib/client"
import { Iproduct } from "@/lib/interfaces"
import Image from "next/image"



export function Carousels({ ProductData }: { ProductData: Iproduct[] }) {

    const [isRating, SetisRating] = React.useState<boolean>(false)
    const [isChangeCard, SetisChangeCard] = React.useState<number | null>(null)
    React.useEffect(() => {

        SetisRating(true)
    }, [])
    return (
        <section>
            <div className='2xl:max-w-[1280px] mx-auto pt-[66px] lg:pt-[96px]  relative flex justify-center'>
                <Carousel
                    opts={{
                        align: "start",
                    }}
                    className="w-full max-w-[80%] flex items-center justify-center relative"

                >
                    <CarouselContent >
                        {isRating ? ProductData.map((Item, index) => {
                            let total: number = 5
                            let noOfFullStar: number = Math.ceil(Math.random() * (5 - 1) + 1)
                            let emptyStarCount: number = total - noOfFullStar
                            return <CarouselItem key={index} className="basis-[250px] sm:basis-[300px] relative">
                                <div className="p-1">
                                    <Card className="h-[370px]">
                                        <CardContent className="flex flex-col aspect-square items-start justify-center p-6 gap-1">
                                            <div className=" w-full rounded-sm border h-[250px] relative flex justify-center items-center">
                                                <Image src={Item.Img} alt={Item.name} fill={true} />
                                            </div>
                                            <h3 className="text-[18px] text-[#000000] font-normal truncate w-full">{Item.name}</h3>
                                            <div className="w-full flex justify-between items-center text-[#000000] font-medium"><span>Price:</span><span>{Item.price}</span></div>
                                            <div className="flex items-center justify-center gap-1">{noOfFullStar && Array.from({ length: noOfFullStar }).map((_, idx) => <HiStar className="text-yellow-500" key={idx} />)
                                            }{emptyStarCount !== 0 && Array.from({ length: emptyStarCount }).map((_, idx) => <HiOutlineStar className="text-yellow-500" key={idx} />)}</div> {/*acha yaha par basic iss tarah sa ho rha hai kay agr hum direct array ki length set krtay na using "Math.random" toh hydration error ata bcuz server pa jab render hota toh value ko or hoti and jab client pa render hota toh value kuch or hoti isi lia hum na ek state varaible lia or usko  initial false rakha and then useEffect ma usko true krdia taka jab component server pa render hoga toh "isRating" false hoga toh jo humara futher code hai wo server pa render be nhi hoga or jasa hi cilent pa jaka useEffect run hoga toh isRating true hojaga or phr code direct client pa hi render hoga iss lia hydration error nhi ayega.*/}
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        }) : <CarouselSkeleton />}
                    </CarouselContent>
                    <CarouselPrevious className="hidden md:flex" />
                    <CarouselNext className="hidden md:flex" />
                </Carousel>

            </div>
        </section>
    )
}

export default Carousels

// Math.ceil(Math.random()*(5-1)+1)