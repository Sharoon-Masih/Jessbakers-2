import { Schema, model, models } from "mongoose";
import { Icustomer } from "./cust.model";
import { ICartItem } from "./cartItem.model";

export interface Iorder extends Document {
    _id: string,
    stripeId:string,
    itemList: {
        itemName: string,
        price: number,
        qty: number,
        cartItem_Id: ICartItem
    }[],
    totalPrice:number,
    created_At: string,
    address: string,
    contact: string,
    customer: Icustomer,

}

const ItemSchema = new Schema({
    itemName: { type: String, required: true },
    price: { type: String, required: true },
    qty: { type: Number, required: true },
    cartItem_Id: { type: Schema.Types.ObjectId, ref: "Cartitem" },
})

const cartItem_Id = new Schema({
    id:{type:String,required:true}
})
const orderSchema = new Schema({
    stripeId:{type:String,required:true},
    itemList: [cartItem_Id],
    totalPrice:{type:Number,required:true},
    created_At: { type: Date, required: true },
    address: { type: String, required: true },
    contact: { type: String, required: true },
    customer: { type: Schema.Types.ObjectId, ref: "Customer" }, //type:Schema.Types.ObjectId iska mtlb hai Schema ka object ma jo types/datatype accept krskta hai wo ayengi or then usme further agay jo ObjectId wali type hai wo chaiya.
})

const Order = models.Order || model("Order", orderSchema)

export default Order