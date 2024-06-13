import { model } from "mongoose";
import { Document, Schema, models } from "mongoose";

export interface ICartItem extends Document {
    _id:string
    name:string,
    price:number,
    description:string,
    image:string,
    id:string,
    currency:string,
    slug:string,
    category:string,
    customer:{
        _id:string,
        firstName:string,
        email:string,
    }
}

const CartItemSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: String, required: true },
    image: { type: String, required: true },
    currency: { type: String },
    sanityId: { type: String, required: true },
    slug: { type: String },
    category: { type: String, required: true },
    customer:{type:Schema.Types.ObjectId , ref:"Customer"}
})

const CartItem= models.Cartitem || model("Cartitem",CartItemSchema) 
export default CartItem;