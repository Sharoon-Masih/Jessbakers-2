"use client"
import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"
import { MinusIcon, PlusIcon, ShoppingBasketIcon, ShoppingCartIcon } from "lucide-react"
import { useShoppingCart } from "use-shopping-cart"
import { TrashIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import { startTransition, useEffect, useState } from "react"
import OrderDetailForm from "./orderDetailForm"
import { getAllCartItemByUserId, itemQtyDec, itemQtyInc, removeCartItem } from "@/lib/actions/cartItem.action"
import { ICartItem } from "@/lib/database/models/cartItem.model"
import { useAuth, useSession } from "@clerk/nextjs"
import { useAddToCart } from "@/app/context/cartStateContext"
import CartSkeleton from "./cartSkeleton"


export function Cart() {
    const {  totalPrice, handleCartClick, shouldDisplayCart} = useShoppingCart()
    const [cartItems, SetcartItems] = useState<ICartItem[]>([])
    const { isAddToCart, SetisAddToCart } = useAddToCart()! //yeh jo isAddToCart hai iski basis pa useEffect chlta hai like jab be iski value update hogi useEffect new Data fetch krega Db say and kiu kay yeh global state variable hai and jo provider hai wo humna layout ma rakha hai toh iss lia withIn app kahin par be iski value hum update krsktay hain or wo UI pa reflect kregi.

    const { session, isLoaded } = useSession() //in client we cant use auth() obj, therefore we have used useSession() provided by clerk for client component.
    const userId = session?.user.publicMetadata.userId;
    useEffect(() => { //yeh basically just cart item ko show krnay ka liya hai baki iska proper user Authentication ki base pa hoga.

        async function getCartItem() {
            const Items: ICartItem[] = await getAllCartItemByUserId(userId as string)
            SetcartItems(Items)
            return Items;
        }

        if (isLoaded) {  //acha yaha isLoaded true honay pa iss liya getCartItem call kr rhay hain kiu kay useSession ma ek dam data nhi ata , therefore isLoaded ka func clerk ki trf sa milta hai. taka hum check kr skay kay agar isLoaded true hai toh its mean data agya hai.

            getCartItem()
        }
        
    }, [isLoaded, isAddToCart]) //or yaha par on the basis of isLoaded useEffect run krega.


    function handleRemoveCartItem(id: string) {
        if (cartItems) {
            const filteredItem = cartItems.filter((item) => item.sanityId !== id)
            SetcartItems(filteredItem)
            return
        }
    }
    function handleItemQty(id: string, btn: "inc" | "dec") {
        if (btn === "inc") {
            const modifiedItems = cartItems.map((item) => { //yaha simply hum sb array element ko map kr rhay hain jis element ki id match kr rhi hai uski "qty" ko modify kr rhay hain bs and uss item ko return kr rhay hain. 
                if (item.sanityId === id) {
                    item.qty += 1
                    return item
                }
                else {
                    return item //else yaha as it is product return hojayegi.
                }
            })

            SetcartItems(modifiedItems)

        }
        else {
            const modifiedItems = cartItems.map((item) => {
                if (item.sanityId === id) {
                    if (item.qty === 1) //yaha par agr qty already 1 hai toh phr product as it is return hojayegi.
                    {
                        return item
                    }

                    item.qty -= 1
                    return item
                }
                else {
                    return item
                }
            })

            SetcartItems(modifiedItems)

        }
    }
    return (
        <Sheet open={shouldDisplayCart} onOpenChange={handleCartClick}>

            <div onClick={() => { handleCartClick() }}>
                <ShoppingCartIcon className='w-[30px] h-[30px] text-[#272727]' />
            </div>

            <SheetContent className="w-screen md:max-w-lg bg-[#FBEDCD]  text-[#4A1D1F] p-3" >
                <SheetHeader>
                    <SheetTitle className="text-[#4A1D1F] ">Your Cart</SheetTitle>
                </SheetHeader>
                {!isLoaded ? <CartSkeleton/> :cartItems && cartItems.length !== 0 ? < div className="flex h-[96%] w-full justify-between flex-col "><div className="w-full flex flex-col divide-y divide-[#4A1D1F] divide-opacity-60 pt-[30px] h-[75%] overflow-y-auto ">  {cartItems.map((Id) => <div key={Id.id} className="flex gap-3 py-3 justify-between items-center">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border-2 border-[#4A1D1F]">
                        <Image src={Id.image as string} width={100} height={100} alt={Id.name} />
                    </div>
                    <div className="flex flex-col flex-1 gap-2 ">
                        <div className="flex justify-between text-[#272727] text-base font-medium antialiased gap-1">
                            <h1 className="  truncate">{Id.name}</h1>
                            <span>RS.{Id.price}</span>
                        </div>
                        <p className="text-sm font-medium line-clamp-2 text-[#4A1D1F] text-opacity-70 antialiased">{Id.description}</p>
                        <div className="flex justify-between w-full text-sm text-[#4A1D1F] font-medium">
                            <div className="flex justify-start gap-3 ">
                                <Button className=" w-[25px] h-[25px] p-1  " variant={"outline"} onClick={() => { handleItemQty(Id.sanityId, "dec"); itemQtyDec(Id.sanityId, userId as string) }}><MinusIcon /></Button>
                                <span >QTY:{Id.qty}</span>

                                <Button className=" w-[25px] h-[25px] p-1 " variant={"outline"} onClick={() => { handleItemQty(Id.sanityId, "inc"); itemQtyInc(Id.sanityId, userId as string) }}><PlusIcon /></Button>
                            </div>
                            <Button variant={"outline"} className="w-[30px] h-[30px] p-1" onClick={() => { handleRemoveCartItem(Id.sanityId); SetisAddToCart((prev) => !prev); startTransition(() => { removeCartItem(Id.sanityId, userId as string) }) }}><TrashIcon className="text-[#4A1D1F]" /></Button>
                        </div>

                    </div>
                </div>
                )}
                </div>
                    <div className=" border-t border-[#4A1D1F] flex-1 flex flex-col items-center justify-between gap-3 w-full px-[30px] py-5">
                        <div className="flex flex-col w-full">
                            <div className="text-lg font-medium flex justify-between items-center">
                                <strong>Subtotal:</strong>
                                <strong>{totalPrice}RS</strong>
                            </div>
                            <p className="text-sm font-medium  text-[#4A1D1F] text-opacity-80 antialiased">Delivery charges will be 250</p>
                        </div>
                        <div className="w-full">
                            <OrderDetailForm />
                        </div>
                        <span>OR <span className="text-[#4A1D1F] text-opacity-100 text-base font-semibold  cursor-pointer" onClick={handleCartClick}>Continue shopping</span></span>
                    </div>
                </div> : <div className="flex h-[96%] w-full justify-center items-center flex-col">

                    <ShoppingBasketIcon className="text-[#4A1D1F] w-[80%] h-[20%] " />
                    <p className="text-[#4A1D1F] pt-1 text-base font-medium">Your cart is empty</p>
                    <p className="text-base font-semibold pt-3 text-gray-500">Add items to get started</p>
                </div>}

            </SheetContent >
        </Sheet >
    )
}
