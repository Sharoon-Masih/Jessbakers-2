
import { Iorder } from '@/lib/database/models/order.model'
import Image from 'next/image'
import React from 'react'

const OrderCard = async ({ orderData }: { orderData: Iorder }) => {

    return (
        <div className='flex flex-col justify-between gap-5 bg-gray-50 border text-[#4A1D1F] rounded-[14px] py-5 px-4 w-full md:w-[330px] lg:w-[320px] xl:w-[310px]   h-[400px]'>
            <div className='w-full flex-col gap-1 items-start justify-center '>
                <strong className='text-sm sm:text-base lg:text-sm'>Order #{orderData._id}</strong>
                <p className='text-[#272727] font-medium opacity-70 text-sm'>{orderData.created_At}</p>
            </div>
            <div className='flex flex-col gap-3 divide-y flex-1 justify-start overflow-auto'>
                {orderData.orderedProduct.itemList.map((itemData) => <div className='flex justify-between gap-5 w-full items-center pt-3' key={itemData.itemName}>
                    <div className='w-[80px] h-[80px] rounded-full bg-white overflow-hidden relative'>
                       <Image src={itemData.img} fill={true} sizes={"sm"} alt={itemData.itemName} className='object-cover object-center'/>
                    </div>
                    <div className='flex flex-col gap-1 relative flex-1'>
                        <h1 className='line-clamp-1 font-semibold text-base'>{itemData.itemName}</h1>
                        <p className='line-clamp-1 text-[#272727] font-medium opacity-70 text-sm'>{itemData.desc}</p>
                        <div className='flex justify-between w-full'>
                            <span className='text-sm font-semibold text-[#272727]'>{itemData.price}</span>
                            <span className='text-sm font-semibold text-[#272727]'>Qty:{itemData.qty}</span>
                        </div>
                    </div>
                </div>)}
            </div>
            <div className='flex justify-between border-t pt-3'>

                <p className='text-[#272727] font-medium opacity-70 text-sm'>#{orderData.orderedProduct.itemList.length} items</p>
                <p className='line-clamp-1 text-[#272727] font-medium opacity-70 text-sm'>will be deliver at 2:00pm</p>
            </div>
            <div className='flex flex-col gap-1 '>
                <span className=' text-sm font-medium'>delivery charges: 250</span>
                <div className='flex justify-between w-full'>
                    <span className='font-semibold '>total price:</span>
                    <span className='font-semibold '> {orderData.totalPrice + 250}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default OrderCard