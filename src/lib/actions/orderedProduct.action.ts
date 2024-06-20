'use server'

import { connectToDb } from "../database";
import Customer from "../database/models/cust.model";
import OrderedProductModel from "../database/models/orderedProduct.model";
import OrderedProduct, { IorderedProduct } from "../database/models/orderedProduct.model";
import { handleError, orderSchemaType, orderedProductSchemaType } from "../types";

export async function createOrderedProduct(order: orderedProductSchemaType) {

    try {
        await connectToDb()
        const isCustomer = await Customer.findById(order.customer);
        if (!isCustomer) {
            throw new Error('customer does not exist')
        }
        const newOrder = await OrderedProductModel.create(order)

        return JSON.parse(JSON.stringify(newOrder))

    } catch (error) {
        handleError(error)
    }
}

export async function getRecentOrderedProduct(currentUserId: string) {

    try {
        await connectToDb()
        const isCustomer = await Customer.findById(currentUserId);
        if (!isCustomer) {
            throw new Error('customer does not exist')
        }
        const recentProduct: IorderedProduct[] = await OrderedProductModel.find({ customer: currentUserId }).sort({ created_At: "desc" }).limit(1)
        return recentProduct ? JSON.parse(JSON.stringify(recentProduct)) : null
    } catch (error) {
        handleError(error)
    }

}