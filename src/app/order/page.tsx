import OrderCard from '@/components/orderCard'
import React from 'react'

const OrderPage = async () => {
// const orderData=await getAllOrders()
return (
<main >
<section className='${poppin.className} text-[#4A1D1F] relative overflow-hidden height ' >
    <div className='2xl:max-w-[1280px] mx-auto h-full py-[30px] lg:py-[40px] px-4 '>
        <span className={`text-[18px] sm:text-[20px] md:text-[25px] font-semibold tracking-[9%] text-[#4A1D1F] uppercase truncate`}>
            My Orders
        </span>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center items-center gap-5 z-30 py-[20px] lg:py-[30px]'>
          <OrderCard/>
        </div> 
        {/* <div className='flex flex-col items-center justify-center bg-[#FBEDCD] rounded-[14px] min-h-[200px] w-full gap-3 text-center my-[20px] lg:my-[30px]'>
        <h3 className='font-bold text-[20px] leading-[30px] tracking-[2%] md:font-bold md:text-[28px] md:leading-[36px]'>You have not Ordered anything yet</h3>
        </div> */}
    </div>
</section>
</main>
)
}

export default OrderPage