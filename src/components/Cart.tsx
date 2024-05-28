import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { MinusIcon, PlusIcon, ShoppingBasketIcon, ShoppingCartIcon } from "lucide-react"
import { useShoppingCart } from "use-shopping-cart"
import { TrashIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import { useState } from "react"
export function Cart() {
    const [noOfCartItem, SetnoOfCartItem] = useState<number>(0)
    const { removeItem, totalPrice, handleCartClick, shouldDisplayCart, cartCount, cartDetails, incrementItem, decrementItem } = useShoppingCart()
    return (
        <Sheet open={shouldDisplayCart} onOpenChange={handleCartClick}>

            <div onClick={() => { handleCartClick() }}>
                <ShoppingCartIcon className='w-[30px] h-[30px] text-[#272727]' />
            </div>

            <SheetContent className="w-screen md:max-w-lg bg-[#FBEDCD]  text-[#4A1D1F] p-3">
                <SheetHeader>
                    <SheetTitle className="text-[#4A1D1F] ">Your Cart</SheetTitle>
                </SheetHeader>
                {cartCount !== 0 ? < div className="flex h-[96%] w-full justify-between flex-col "><div className="w-full flex flex-col divide-y divide-[#4A1D1F] divide-opacity-60 pt-[30px] h-[75%] overflow-y-auto ">  {Object.values(cartDetails ?? {}).map((Id) => <div key={Id.id} className="flex gap-3 py-3 justify-between items-center">
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
                                <Button className=" w-[25px] h-[25px] p-1  " variant={"outline"} onClick={() => { decrementItem(Id.id, { count: 1 }); SetnoOfCartItem((prev) => prev - 1) }}><MinusIcon /></Button>
                                <span >QTY:{Id.quantity}</span>

                                <Button className=" w-[25px] h-[25px] p-1 " variant={"outline"} onClick={() => { incrementItem(Id.id, { count: 1 }); SetnoOfCartItem((prev) => prev + 1) }}><PlusIcon /></Button>
                            </div>
                            <Button variant={"outline"} className="w-[30px] h-[30px] p-1" onClick={() => { removeItem(Id.id) }}><TrashIcon className="text-[#4A1D1F]" /></Button>
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
                        <Button className="w-full bg-[#4A1D1F]">Checkout</Button>

                        <span>OR <span className="text-[#4A1D1F] text-opacity-100 text-base font-semibold">Continue shopping</span></span>
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
