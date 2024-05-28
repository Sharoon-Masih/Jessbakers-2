"use client"
import React from 'react'
import { Button } from './ui/button'
import { useShoppingCart } from 'use-shopping-cart'

const OrderBtn = () => {
  const {handleCartClick}=useShoppingCart()
  return (
    <Button className='bg-[#4A1D1F] text-[#FFFFFF] w-[130px] sm:w-[166px] sm:h-[50px] text-[15px] sm:text-[20px] font-medium flex justify-center items-center' onClick={handleCartClick}>Order Now</Button>
  )
}

export default OrderBtn