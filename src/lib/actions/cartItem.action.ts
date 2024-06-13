'use server'

import { redirect } from "next/navigation";
import { connectToDb } from "../database";
import CartItem, { ICartItem } from "../database/models/cartItem.model";
import Customer from "../database/models/cust.model";
import { addToCartSchemaType, handleError } from "../types";

export async function addToCart(cartItem: addToCartSchemaType) {
    try {
        await connectToDb()

        const isCustomer = await Customer.findById(cartItem.customer)
        
        if (!isCustomer) {
           throw new Error("customer not exist again sign-in")
        }
        const isCartItem: ICartItem | null = await CartItem.findOne({ sanityId: cartItem.sanityId })
        const CartItemDoesExist: ICartItem | null = await CartItem.findById(isCartItem?._id)

        if (CartItemDoesExist) {
            return JSON.parse(JSON.stringify(CartItemDoesExist))
        }
        const newCartItem: ICartItem = await CartItem.create(cartItem)

        return JSON.parse(JSON.stringify(newCartItem))

    } catch (error) {
        handleError(error)
    }
}