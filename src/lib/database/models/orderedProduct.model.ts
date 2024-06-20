import { model } from "mongoose";
import { Schema, models } from "mongoose";

export interface IorderedProduct {
    _id: string,
    itemList: {
        itemName: string,
        price: number,
        qty: number,
        desc: string,
    }[],
    customer: string
}

const ItemSchema = new Schema({
    itemName: { type: String, required: true },
    price: { type: Number, required: true },
    qty: { type: Number, required: true },
    desc: { type: String },
})

const orderedProductSchema = new Schema({
    itemList: [ItemSchema],
    customer: { type: Schema.Types.ObjectId, ref: "Customer" }
})

const OrderedProduct = models.orderedProduct || model("orderedProduct", orderedProductSchema)

export default OrderedProduct