"use client" //must make the cartProvider as client component 

import React, { ReactNode } from 'react'
import {CartProvider} from "use-shopping-cart"
const Providers = ({children}:{children:ReactNode}) => { //must wrap all the tags inside layout.tsx after "body" tag so that CartProvider implement on whole app.
  return (
    <CartProvider 
     cartMode='client-only' 
     currency='PKR'
     stripe={process.env.NEXT_PUBLIC_STRIPE_KEY as string}
     mode='payment'
     billingAddressCollection={true}
     successUrl='http://localhost:3000/stripe/addedsuccessfully' //yeh wo URL hai jaha jasa hi sale successful hogi automatically redirect hojayega.
     cancelUrl='http://localhost:3000/stripe/error'
     shouldPersist={true}
     language='en-US'

    >
     {children}
    </CartProvider>
  )
}

export default Providers