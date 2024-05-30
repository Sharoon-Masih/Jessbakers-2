"use client"
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Iproduct } from "@/lib/interfaces"
import { ReactNode, useState } from "react"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { XMarkIcon, PlusIcon, MinusIcon } from "@heroicons/react/24/outline"
import Image from "next/image"
import { Button } from "./ui/button"
import { useToast } from "./ui/use-toast"
import AddtoCart from "./addtoCart"

export function SingleItemCard({ children, Item, searchItem }: { children: ReactNode, Item: Iproduct, searchItem?: string }) {

    const [isClick, SetisClick] = useState(false);
    // const {addItem}= useShoppingCart()
    

    return (

        <AlertDialog open={isClick} onOpenChange={SetisClick}>
            <AlertDialogTrigger asChild className="">
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent className="flex rounded-lg w-full h-[500px]  lg:min-w-[1000px] lg:h-[600px]  p-3 py-4 flex-col lg:flex-row justify-center overflow-y-auto overflow-x-hidden box-border">
                <div className="hidden lg:flex relative justify-center items-center lg:items-start p-2 border-b lg:border-r lg:border-b-0">
                    <div className="h-[250px] w-full z-10 lg:h-[300px] lg:w-[350px]  rounded-lg relative ">
                        <Image src={Item.Img} alt={Item.name} fill={true} />
                    </div>
                </div>
                <div className="h-full flex-1  gap-[20px] flex flex-col lg:justify-between relative">
                    <div className=" gap-[50px] flex flex-col">  <div className="flex flex-col gap-2">
                        <div className="w-full justify-between flex gap-2"><h1 className="text-[30px] font-semibold text-[#4A1D1F] antialiased truncate">{Item.name}</h1><div className="w-6 h-6 p-0 m-0 relative"> <AlertDialogCancel className="p-0 w-full h-full"><XMarkIcon /></AlertDialogCancel></div></div>
                        <strong className="text-[#272727] text-[20px] font-semibold">RS. {Item.price}
                        </strong>
                        <div className="flex justify-center items-center p-1 rounded-md  ring ring-[#FBEDCD] bg-[#FBEDCD]"><p className="text-[#272727] font-semibold ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae ea mollitia dicta in iste nihil vitae numquam quasi esse perspiciatis.</p></div>
                    </div>
                        <div className="flex flex-col w-full gap-[10px]">
                            <div className="flex justify-between items-center w-full border-b rounded-lg">
                                <Label className="flex items-center justify-center gap-2 text-[16px] text-[#272727] font-semibold py-2"><Input type="radio" name="size" className="w-5 h-5" value={"medium"} />Medium</Label><span className="text-[16px] text-[#272727] font-semibold ">{Item.price}</span>
                            </div>
                            <div className="flex justify-between items-center w-full border-b rounded-md ">
                                <Label className="flex items-center justify-center gap-2 text-[16px] text-[#272727] font-semibold py-2"><Input type="radio" name="size" className="w-5 h-5" value={"large"} />Large</Label><span className="text-[16px] text-[#272727] font-semibold ">{Item.price}</span>
                            </div>
                            <div className="flex flex-col gap-2 my-2 ">
                                <span className="text-[16px] text-[#272727] font-semibold">Special Instructions</span>
                                <Textarea rows={5}></Textarea>
                            </div>
                        </div>


                    </div>
                    <AlertDialogCancel className="p-0  pb-3 border-none shadow-none lg:pb-0 lg:border  lg:shadow" ><AddtoCart Item={Item} /></AlertDialogCancel>
                </div>

            </AlertDialogContent>

        </AlertDialog>
    )
}

{/* <AlertDialogHeader>
                    <AlertDialogTitle>{Item.name}</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter> */}