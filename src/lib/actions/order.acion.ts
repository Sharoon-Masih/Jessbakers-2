'use server'

import { stripVTControlCharacters } from "util";
import { connectToDb } from "../database";
import CartItem from "../database/models/cartItem.model";
import Customer from "../database/models/cust.model";
import Order from "../database/models/order.model";
import { handleError, itemListParams, orderSchemaType } from "../types";
import { Stripe } from 'stripe'
import { redirect } from "next/navigation";
import { orderDetailType } from "@/components/orderDetailForm";

export async function checkoutOrder(itemList: itemListParams[], currentUserId: string, values: orderDetailType) {

 const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

    try {

        const session = await stripe.checkout.sessions.create({
            line_items:itemList,
            metadata: {
                customer: currentUserId,
                address: values.address,
                contact: values.contact
            },
            mode: "payment",
            success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/?success=true`,
            cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`

        })

        redirect(session.url!)

    } catch (error) {
        throw (error)
    }

}

export async function createOrder(order: orderSchemaType) {
    try {
        await connectToDb()
        const isCustomer = await Customer.findById(order.customer);
        if (!isCustomer) {
            throw new Error('customer does not exist')
        }
        const newOrder = await Order.create(order)
        CartItem.deleteMany({ customer: order.customer })
        return JSON.parse(JSON.stringify(newOrder))
    } catch (error) {
        handleError(error)
    }
}

export async function getAllOrders(currentUserId:string) {
    
    try {

        await connectToDb()

        const isCustomer= await Customer.findById(currentUserId)
        if(!isCustomer){
            throw new Error("customer does not exist")
        }

        const allOrders = await Order.find({customer:currentUserId})
        
        return allOrders ? JSON.parse(JSON.stringify(allOrders)) : null
    } catch (error) {
        handleError(error)
    }
}