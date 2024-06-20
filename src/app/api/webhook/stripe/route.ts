import stripe, { Stripe } from 'stripe'
import { NextResponse } from 'next/server'
import { createOrder } from '@/lib/actions/order.acion'

//now here we created a webhook 
export async function POST(request: Request) { //here we define a POST method bcuz the request that will come when the webhook will be hitted, so that request is for doing some data mutation not for getting data so therefore here i define POST method.
    const body = await request.text() //here by using ".text()" method converting req into string format.

    const sig = request.headers.get('stripe-signature') as string //here getting header named as "stripe-signature"

    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET! //it is our Webhook API secret.

    let event; //here we let this variable as any.

    try {
        event = stripe.webhooks.constructEvent(body, sig, endpointSecret) //now here we are constructing Event which is main task and assigning the result to "event" variable which we have declared above.now basically ".constructEvent()" method from stripe.webhook takes 3 parameter which we have defined above . 

        // body -> this variable basicaly contain the body that we receive with request and then when we assign the body variable to .construct method take it as payload.Now basically payload is itself nothing it is a data that you send in body via request, but payload is a data that is neccessary for performing that operation it does not contain unneccesary data. 

        //sig -> it is header that ".constructEvent" require
        //endpointSecret -> it is our stripe secret webhook key.


    } catch (err) {
        return NextResponse.json({ message: 'Webhook error', error: err })  //this msg will print in case of errror.
    }

    // Get the ID and type
    const eventType = event.type //now here we assigning the type of event that occur to "eventType" variable

    const gettingSession= new Stripe(process.env.STRIPE_SECRET_KEY as string) //yaha par basically humay jo line_item ma porducts diya hain unko get krnay ka liya ek new instance create kr rhay hain of Stripe class, but remember secret key same hi rakhni hai.
    // CREATE
    if (eventType === 'checkout.session.completed') { //here we are implementing the condition that if event is of type "checkout.session.completed" so then execute the below code, in simple words that if the eventType is = checkout.session.completed then our order will be save in Db through the createOrder() server action.
        const { id, amount_total, metadata, } = event.data.object //now here retrieving the data from ".object" like the stripeId, amount_total of product for which this checkout session is created and the metadata of product.

        const listlineItems = await gettingSession.checkout.sessions.listLineItems(id,{
            expand:['data.price.product'] //yaha par expand iss liya kia hai bcuz agr expand nhi krega toh .product ma jo values hai unko dekh nhi payenga but abhi be wohi msla aa rha haka product ma values toh aa rhi hai but unko access nhi kr sktay.
        }) //yaha par hum .listlineItems() ka method kay through sari product list le rhay hain
        console.log(listlineItems.data[0].price?.product); //yaha product tk toh data mil rha hai but product ka andar jo data hai humay wo chaiya but wo nhi mil rha issi lia abhi hum isko comment out kr rhay hain.
        console.log(listlineItems); //yaha product tk toh data mil rha hai but product ka andar jo data hai humay wo chaiya but wo nhi mil rha issi lia abhi hum isko comment out kr rhay hain.

        let orders;
        // const itemList=listlineItems.data.map((item)=> {
        //     const {metadata}=item.price?.product
        //     return (
        //         orders={
        //             itemName:""
        //             // price,
        //             // qty,
        //             // sanityId,
        //             // size,
        //             // img
        //         }
        //     )
        // })
        // console.log(itemList);
        const order = { //then here we created a obj named as order and assign the above values to this obj properties
            stripeId: id,
            totalPrice: (amount_total! / 100),
            created_At: new Date().toLocaleString(),
            address: metadata?.address ?? '',
            contact: metadata?.contact ?? '',
            customer: metadata?.customer ?? '',
            orderedProduct:metadata?.orderedProduct ?? ''
        }

        const newOrder = await createOrder(order) //here simply invoking the server action and passing order obj to it.
        return NextResponse.json({ message: 'OK', order: newOrder }) //in response we get this msg and the newOrder obj.    
    }

    return new Response('', { status: 200 })
}