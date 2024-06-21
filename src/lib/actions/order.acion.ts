'use server'
import { connectToDb } from "../database";
import CartItem from "../database/models/cartItem.model";
import Customer from "../database/models/cust.model";
import Order from "../database/models/order.model";
import { handleError, itemListParams, orderSchemaType } from "../types";
import { Stripe } from 'stripe'
import { redirect } from "next/navigation";
import { orderDetailType } from "@/components/orderDetailForm";
import OrderedProduct from "../database/models/orderedProduct.model";

export async function checkoutOrder(itemList: itemListParams[], currentUserId: string, values: orderDetailType, recentProduct?: string) {

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

    try {

        const session = await stripe.checkout.sessions.create({
            line_items: itemList,
            metadata: {
                customer: currentUserId,
                address: values.address,
                contact: values.contact,
                orderedProduct: recentProduct ?? ''
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
        await CartItem.deleteMany({ customer: order.customer })
        return JSON.parse(JSON.stringify(newOrder))
    } catch (error) {
        handleError(error)
    }
}

export async function getAllOrders(currentUserId: string) {

    try {

        await connectToDb()

        const isCustomer = await Customer.findById(currentUserId)
        if (!isCustomer) {
            throw new Error("customer does not exist")
        }
        await OrderedProduct.find({}) //remember jab be populate use krna hai toh pehla jis collection kay documents sa populate krna hai wo yaha await ka through find krnay say yeh hoga ka load hojaga, but its not a good practice but after alot struggle i find only this way 🤗

        const allOrders = await Order.find({ customer: currentUserId }).populate({ path: "orderedProduct", model: "OrderedProduct", select: "_id itemList" }).sort({ created_At: "desc" })

        return allOrders ? JSON.parse(JSON.stringify(allOrders)) : null
    } catch (error) {
        console.log(error)
    }
}