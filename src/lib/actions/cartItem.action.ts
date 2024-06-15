'use server'

import { connectToDb } from "../database";
import CartItem, { ICartItem } from "../database/models/cartItem.model";
import Customer, { Icustomer } from "../database/models/cust.model";
import { addToCartSchemaType, handleError } from "../types";

export async function addToCart(cartItem: addToCartSchemaType) {
    try {
        await connectToDb()

        const isCustomer = await Customer.findById(cartItem.customer)

        if (!isCustomer) {
            throw new Error("customer not exist again sign-in")
        }
        const isCartItem: ICartItem | null = await CartItem.findOne({ sanityId: cartItem.sanityId,customer:isCustomer._id }) //yaha hum customer ko and product sanityid ko iss lia check kr rhay hain bcuz let suppose we have 2 customers ab dono ki cart obvious si bt hai different hai but in Db sab ek hi collection ma jaka store ho rahay hain ab let suppose agr srf ma sanityId ki base pa check krta kay agr sanityId hai product ki toh usse delete,update ya etc krdo.but ab issue yeh ata haka ab sanityId toh product ki ek hi rahegi toh hua yeh kay ab jo dono customer hain unho na same product rakhi hai apni carts may like cust1 nay be brownie rakhi hai and cust2 na bhi, ab cust2 jo hai wo brownie ko delete krna chata hai cart sa but cust1 ko toh buy krni hai brownie, toh at that point agr srf hum on the basis of sanityId check krtay toh jo brownie hai uski toh sanityId same hi hna chahay wo cust1 ki cart ma ho ya cust2 ki cart may , but cust1 and cust2 dono ki id different hai , toh ab jab humna yeh condition lgyi na kay sanityId be check krni hai and customer be toh isse yeh hua kay ab agr cust2 ko brownie remove krni hna toh wo behind the scene check krega jaka agr customer id and sanity id dono same hongi phr wo bs uss product ko delete krega na kay sab hi product ko with same Sanity Id delete krega.
        const CartItemDoesExist: ICartItem | null = await CartItem.findById(isCartItem?._id)

        if (CartItemDoesExist) {
            const CartItemUpdated: ICartItem | null = await CartItem.findByIdAndUpdate(isCartItem?._id, cartItem)

            return JSON.parse(JSON.stringify(CartItemUpdated))
        }
        const newCartItem: ICartItem = await CartItem.create(cartItem)

        return JSON.parse(JSON.stringify(newCartItem))

    } catch (error) {
        handleError(error)
    }
}

export async function removeCartItem(id: string,userId:string) {

    try {
        await connectToDb()
        const isCustomer = await Customer.findById(userId)

        if (!isCustomer) {
            throw new Error("customer not exist again sign-in")
        }
        
        const itemToRemove: ICartItem | null = await CartItem.findOne({ sanityId: id,customer:isCustomer._id })
        if (!itemToRemove) {
            throw new Error("item not found")
        }
        const deletedItem: ICartItem | null = await CartItem.findByIdAndDelete(itemToRemove?._id)
        return deletedItem ? JSON.parse(JSON.stringify(deletedItem)) : null
    } catch (error) {
        handleError(error)
    }
}

// export async function updateItemSize(size: "medium" | "large", id: string) {

//     try {
//         await connectToDb()
//         const itemToBeUpdate: ICartItem | null = await CartItem.findOne({ sanityId: id })
//         if (!itemToBeUpdate) {
//             throw new Error('item does not exist')
//         }

//         if (size === "medium") {

//             const productSizeM = await CartItem.findByIdAndUpdate(itemToBeUpdate._id, { $set: { size: "medium" } })
//             return JSON.parse(JSON.stringify(productSizeM))
//         }
//         else if (size === "large") {

//             const productSizeL = await CartItem.findByIdAndUpdate(itemToBeUpdate._id, { $set: { size: "large" } })
//             return JSON.parse(JSON.stringify(productSizeL))

//         }

//         return JSON.parse(JSON.stringify(itemToBeUpdate))

//     } catch (error) {
//         handleError(error)
//     }

// }
export async function itemQtyInc(id: string,userId:string) {
    try {
        await connectToDb()
         const isCustomer = await Customer.findById(userId)

        if (!isCustomer) {
            throw new Error("customer not exist again sign-in")
        }
        const itemToBeInc: ICartItem | null = await CartItem.findOne({ sanityId:id,customer:isCustomer._id })
        if (!itemToBeInc) {
            throw new Error('Item is not available in cart')
        }
        const qtyIncreased = await CartItem.findByIdAndUpdate(itemToBeInc._id, { $inc: { qty: 1 } })

        return JSON.parse(JSON.stringify(qtyIncreased))

    } catch (error) {
        handleError(error)
    }
}
export async function itemQtyDec(id: string,userId:string) {
    try {
        await connectToDb()
         const isCustomer = await Customer.findById(userId)

        if (!isCustomer) {
            throw new Error("customer not exist again sign-in")
        }
        const itemQtyDec: ICartItem | null = await CartItem.findOne({ sanityId: id,customer:isCustomer._id })
        if (!itemQtyDec) {
            throw new Error('Item is not available in cart')
        }
        if (itemQtyDec.qty <= 1) {
            return JSON.parse(JSON.stringify(itemQtyDec))

        }
        const qtyDecreased = await CartItem.findByIdAndUpdate(itemQtyDec._id, { $inc: { qty: -1 } }) //in MongoDb there no decrement op so therefore bu using inc op we can decrease he value as well

        return JSON.parse(JSON.stringify(qtyDecreased))

    } catch (error) {
        handleError(error)
    }
}

export async function getAllCartItemByUserId(currentUserId: string) {
    try {
        await connectToDb()
        const isCustomer: Icustomer | null = await Customer.findById(currentUserId)
        
        if (!isCustomer) {
            throw new Error("customer does not exist")
        }
        const isCustomerCart = await CartItem.find({ customer: isCustomer._id })
        return isCustomerCart ? JSON.parse(JSON.stringify(isCustomerCart)) : null
    } catch (error) {
        handleError(error)
    }
}