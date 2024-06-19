"use client"

import { useForm } from "react-hook-form"
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { orderDetail } from "@/lib/zodSchema/orderDetail"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ICartItem } from "@/lib/database/models/cartItem.model"
import {  orderSchemaType } from "@/lib/types"
import { checkoutOrder, createOrder } from "@/lib/actions/order.acion"
import { loadStripe } from '@stripe/stripe-js'
import { useEffect } from "react"

export type orderDetailType = z.infer<typeof orderDetail>

loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string //this is our secret
);

const OrderCheckout = ({ cartItems, currentUserId }: { cartItems: ICartItem[], currentUserId: string }) => {

  useEffect(() => {  //this code is also pasted from stripe docs
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search); //basically here by using URLSearchParams class it to manipulate query.
    if (query.get('success')) { //now here we are checking that jo searchParam ma "success" query parameter ho agr wo exist krta ho toh its mean order placed.
      console.log('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) { //else here it is saying that searchParam ma "canceled" query parameter ho agr wo exist krta ho toh its mean order canceled.
      console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
    }
  }, []);

  const form = useForm<orderDetailType>({
    resolver: zodResolver(orderDetail),
    // defaultValues:{} //remember yaha agr jin fields ko hum defaultvalues provide krdein ga wo phr required nhi rahegi kiu kay unki default dedi hai.
  })

  async function onSubmit(values: orderDetailType) {

    let Item;
    const itemList = cartItems.map((item) => {
      return (

        Item = {
          price_data: {
            currency: "usd",
            unit_amount: item.price * 100,  //converting it in cents bcuz these price are going to stripe checkout session.
            product_data: {
              name: item.name,
              metadata:{
                cartItem_id:item._id
              }
            }
          },
          quantity: item.qty,
        }

      )
    })


    const checkoutOrderData = await checkoutOrder(itemList, currentUserId,values)

    // const newOrder: orderSchemaType = {
    //   // itemList: itemList,
    //   created_At: new Date().toLocaleString(),
    //   address: values.address,
    //   contact: values.contact,
    //   customer: currentUserId
    // }
    // await createOrder(newOrder)
  }
  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} method="post" className="space-y-2">
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="address" {...field} className="outline-none outline-offset-0 focus-visible:ring-offset-0 focus-visible:ring-transparent " />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="contact"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="tel" className="outline-none outline-offset-0 focus-visible:ring-offset-0 focus-visible:ring-transparent" placeholder="03001234567" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full bg-[#4A1D1F]">Checkout</Button>
      </form>
    </Form>
  )
}

export default OrderCheckout