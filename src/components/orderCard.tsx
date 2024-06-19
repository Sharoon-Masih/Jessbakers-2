import React from 'react'

const OrderCard = () => {
    return (
        <div className='flex flex-col gap-5 bg-gray-50 border text-[#4A1D1F] divide-[#272727] divide-opacity-60 rounded-[14px] py-5 px-4 min-w-[300px] min-h-[350px] max-w-[350px] max-h-[390px]'>
            <div className='w-full flex-col gap-1 items-start justify-center pb-3'>
                <strong className=''>Order #67247238</strong>
                <p className='text-[#272727] font-medium opacity-70 text-sm'>{new Date().toLocaleString()}</p>
            </div>
            <div className='flex justify-between gap-5 w-full items-center '>
                <div className='w-[80px] h-[80px] rounded-full bg-white overflow-hidden'></div>
                <div className='flex flex-col gap-1 relative flex-1'>
                    <h1 className='line-clamp-1 font-semibold text-base'>Fudge Cake</h1>
                    <p className='line-clamp-1 text-[#272727] font-medium opacity-70 text-sm'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reprehenderit, hic!</p>
                    <div className='flex justify-between w-full'>
                        <span className='text-sm font-semibold text-[#272727]'>98$</span>
                        <span className='text-sm font-semibold text-[#272727]'>Qty:1</span>
                    </div>
                </div>
            </div>
            <div className='flex justify-between border-t border-opacity-5 pt-3'>
            
            </div>
        </div>
    )
}

export default OrderCard