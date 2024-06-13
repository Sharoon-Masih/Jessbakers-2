"use client"
import React, { startTransition, useState } from 'react'
import { Button } from './ui/button';
import { useShoppingCart } from 'use-shopping-cart'
import { ICartProduct, Iproduct } from '@/lib/interfaces';
import { useToast } from './ui/use-toast';
import { addToCart } from '@/lib/actions/cartItem.action';


const AddtoCart = ({ Item,currentUserId}: { Item: Iproduct,currentUserId:string }) => {

    const isEmpty = (obj: any) => {
        return Object.keys(obj).length === 0 && obj.constructor === Object; //toh yeh func ko bnanay ki waja nicha explain ki hai, ab yeh iss tarh sa work kr rha haka yeh ek argument lega jokay any type hai basically w will pass it object ab wo jo "Object" class hai usme jo keys() ka method hai object ki keys ka ek array return krta hai or uspa humna ".length" ka method trhough yeh check kr ra hain agr returned array ki length 0 ho and "obj.constructor === Object" iska mtlb haka jo be argument get ho wo "Object" hi ho jokay hum ".constructor" ka through seekh rhay hain. 
    };

    
    
    const { toast } = useToast()
    const { addItem, incrementItem, decrementItem, cartDetails, checkoutSingleItem } = useShoppingCart()
    const cartItem: ICartProduct = {
        name: Item.name,
        description: "i will add later on",
        price: Item.price,
        image: Item.Img,
        currency: "PKR",
        id: Item._id,
        slug: Item.slug,
        category: Item.category,

    }
    return (
        <div className="text-[#4A1D1F] font-semibold w-full 
    ">
            {/* <div className="flex-1 w-full"> */}
            {/* what we are doing in below code? yaha hum basically yeh check kr rhay hain kay jab ek dafa item add hoja "add to cart" pa click krnay say toh phr uska bd hum jitni marzi dafa click wo bar bar uss item ko add na kray or agr humay increment ya decrement krna hai quantity ma toh wo by using incrementItem/decrementItem func jo uper use kia hai usse hojaga, toh iska liya ab jo initial condition hna kay agr cartdetail may jo id hai wo cartItem may jo id hai usse match hoja toh added likha ajay, toh yeh toh hogya but issue aya kay jab hum usse item ko remove krnga cart say toh jo toh zahir hai "cartDetail" be empty hoja ga or phr at that time hum chahay gay kay jo "add to cart" wala btn hai wo phr sa appear hojaye but asa nhi ho rha tha kiu kay "cartDetail" just ek empty object {} yeh return kr rha tha when its empty but ab agr usko condition ma lgatay thay toh wo error ata tha kay object ko direct as a value nhi check krskta like this: "cartDetails === {}"  uski waja yeh haka JS/TS ma objects are reference type toh hum unka reference pass krka toh check kr sktay hain like this cartDetails.name === cartItem.name but direct as a ek new obj bnakay joka as a value use ho rha hai yaha par toh usko yun nhi use krkstay toh phr we created isEmpty() go and check on above lines. */}
            {/* {Object.values(cartDetails ?? { }).map((entry) => entry.id === cartItem.id && <Button key={entry.name} className="w-full bg-[#4A1D1F]" >Added</Button> )}
                
                {
                    isEmpty(cartDetails) && <Button className="w-full bg-[#4A1D1F]" onClick={() => { addItem(cartItem) }}>Add to Cart</Button>
                } */}


            <Button className="w-full bg-[#4A1D1F]" onClick={() => {
                addItem(cartItem, { count: 1, product_metadata: { type: `${cartItem.category}` }, price_metadata: { price: cartItem.price } });
                toast({
                    description: "Item is added successfully",
                    variant: "destructive",
                    duration: 2000
                });

                startTransition(() => { addToCart({ ...cartItem, sanityId: cartItem.id, customer:currentUserId }) })
            }}>Add to Cart</Button>

            {/* </div> */}
        </div>
    )
}

export default AddtoCart

// flex flex-col pb-3 w-full lg:flex-row justify-between items-center gap-4 