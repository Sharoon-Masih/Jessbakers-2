'use server'

import { connectToDb } from "../database";
import Customer, { Icustomer } from "../database/models/cust.model";
import { custSchemaType, handleError } from "../types";

export async function createNewCustomer(customer: custSchemaType) {

    try {

        await connectToDb()

        const newCustomer: Icustomer = await Customer.create({ customer })

        if (!newCustomer) {
            throw new Error('customer not created successfully')
        }
        return JSON.parse(JSON.stringify(newCustomer))
    }
    catch (error) {
        handleError(error)
    }
}