"use client"

import { useForm } from "react-hook-form"
import { z } from 'zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { orderDetail } from "@/lib/zodSchema/orderDetail"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"


type orderDetailType = z.infer<typeof orderDetail>

const OrderDetailForm = () => {
  const form = useForm<orderDetailType>({
    resolver:zodResolver(orderDetail), 
    // defaultValues:{} //remember yaha agr jin fields ko hum defaultvalues provide krdein ga wo phr required nhi rahegi kiu kay unki default dedi hai.
  })

  function onSubmit(values:orderDetailType) {
    console.log(values)
  }
  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input placeholder="address" {...field} className="outline-none outline-offset-0 focus-visible:ring-offset-0 focus-visible:ring-transparent "/>
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

export default OrderDetailForm