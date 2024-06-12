//customer model

import { Schema, model, models } from "mongoose";

export interface Icustomer extends Document { 
    _id: string,
    clerkId: string,
    firstName: string,
    lastName: string,
    email: string,
    photo:string

}

const custSchema = new Schema({
    clerkId: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    photo: { type: String }

})

const Customer = models.Customer || model("Customer", custSchema)

export default Customer