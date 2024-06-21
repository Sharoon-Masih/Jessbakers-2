import { Schema, model, models } from "mongoose";
import OrderedProduct from "./orderedProduct.model";
export interface Iorder extends Document {
    _id: string,
    stripeId: string,
    totalPrice: number,
    created_At: string,
    address: string,
    contact: string,
    customer: string,
    orderedProduct: {
        _id: string,
    itemList: {
        itemName: string,
        price: number,
        qty: number,
        desc: string,
        img:string
    }[],
    }

}

const orderSchema = new Schema({
stripeId: { type: String, required: true },
totalPrice: { type: Number, required: true },
created_At: { type: Date, required: true },
address: { type: String, required: true },
contact: { type: String, required: true },
customer: { type: Schema.Types.ObjectId, ref: "Customer" }, //type:Schema.Types.ObjectId iska mtlb hai Schema ka object ma jo types/datatype accept krskta hai wo ayengi or then usme further agay jo ObjectId wali type hai wo chaiya.
orderedProduct: { type: Schema.Types.ObjectId, ref: "OrderedProduct" }
})

const Order = models.Order || model("Order", orderSchema)

export default Order