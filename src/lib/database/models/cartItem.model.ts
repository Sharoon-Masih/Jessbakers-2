import { model } from "mongoose";
import { Document, Schema, models } from "mongoose";
import { RequiredError } from "svix/dist/openapi/apis/baseapi";

export interface ICartItem extends Document {
    _id:string
    name:string,
    price:number,
    description:string,
    image:string,
    sanityId:string,
    currency:string,
    slug:string,
    category:string,
    size?:string,
    qty:number,
    instruction?:string,
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
    size:{ type: String, required:true},
    qty:{type:Number,required:true},
    instruction:{ type: String},
    customer:{type:Schema.Types.ObjectId , ref:"Customer"}
})

const CartItem= models.Cartitem || model("Cartitem",CartItemSchema) 
export default CartItem;

//remember that when the model is created once so mongoose cached it therefore when we makes changes in schema so it does not appear in , to solve this remember whenever make changes in model restart your application so then mongoose we again create fresh model with new schema. 