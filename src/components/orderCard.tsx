import React from 'react'

const OrderCard = () => {
  return (
    <div className='flex flex-col gap-5 bg-[#FBEDCD] text-[#4A1D1F] divide-[#272727] divide-opacity-60 rounded-[14px] py-5 px-4 min-w-[300px] min-h-[350px] max-w-[350px] max-h-[390px]'>
    <div className='w-full flex-col gap-1 items-start justify-center pb-3'>
        <strong className=''>Order #67247238</strong>
        <p className='text-[#272727] font-medium opacity-70 text-sm'>{new Date().toLocaleString()}</p>
    </div>
    <div>

    </div>
    <div></div>
    </div>
  )
}

export default OrderCard