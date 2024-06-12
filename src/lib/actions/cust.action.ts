'use server'

import { connectToDb } from "../database";
import Customer, { Icustomer } from "../database/models/cust.model";
import { custSchemaType, deleteCustParams, handleError } from "../types";

export async function createNewCustomer(customer: custSchemaType) {

    try {

        await connectToDb()

        const newCustomer: Icustomer = await Customer.create(customer)

        if (!newCustomer) {
            throw new Error('customer not created successfully')
        }
        return JSON.parse(JSON.stringify(newCustomer))
    }
    catch (error) {
        handleError(error)
    }
}

export async function updateCustomer(updateCustomer: custSchemaType) {

    try {
        await connectToDb()
        const customerToUpdate:Icustomer | null = await Customer.findOne({ clerkId: updateCustomer.clerkId })
        if(!customerToUpdate){
            throw new Error ("customer not found")
        }
        const customerUpdated = await Customer.findByIdAndUpdate(customerToUpdate._id, updateCustomer)
        return JSON.parse(JSON.stringify(customerUpdated))

    } catch (error) {
        handleError(error)
    }

}
export async function deleteCustomer(deleteCustomer: deleteCustParams) {

    try {
        await connectToDb()
        const customerToDelete:Icustomer | null = await Customer.findOne({ clerkId: deleteCustomer.id })
        if(!customerToDelete){
            throw new Error ("customer not found")
        }
        const customerDeleted = await Customer.findByIdAndDelete(customerToDelete._id)
        return  customerDeleted ? JSON.parse(JSON.stringify(customerToDelete)) : null

    } catch (error) {
        handleError(error)
    }

}

