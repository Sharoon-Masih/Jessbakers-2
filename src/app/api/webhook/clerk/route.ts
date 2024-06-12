import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent, clerkClient } from '@clerk/nextjs/server'
import { custSchemaType } from '@/lib/types'
import { createNewCustomer, updateCustomer } from '@/lib/actions/cust.action'
import { Icustomer } from '@/lib/database/models/cust.model'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {

    // You can find this in the Clerk Dashboard -> Webhooks -> choose the endpoint
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

    if (!WEBHOOK_SECRET) {
        throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
    }

    // Get the headers
    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error occured -- no svix headers', {
            status: 400
        })
    }

    // Get the body
    const payload = await req.json()
    const body = JSON.stringify(payload);

    // Create a new Svix instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent

    // Verify the payload with the headers
    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent
    } catch (err) {
        console.error('Error verifying webhook:', err);
        return new Response('Error occured', {
            status: 400
        })
    }

    // Do something with the payload
    // For this guide, you simply log the payload to the console

    const eventType = evt.type;
    if (eventType === "user.created") {
        const { id, first_name, last_name, email_addresses, image_url } = evt.data
        const Customer: custSchemaType = {
            clerkId: id,
            firstName: first_name!,
            lastName: last_name!,
            email: email_addresses[0].email_address,
            photo: image_url
        }

        const newCustomer: Icustomer = await createNewCustomer(Customer)

        if (newCustomer) {
           await clerkClient.users.updateUserMetadata(id, {
                publicMetadata: {
                    userId: newCustomer._id
                }
            })

            return NextResponse.json({"message":"OK","customer":newCustomer})
        }
    }
    if (eventType === "user.updated") {
        const { id, first_name, last_name, email_addresses, image_url } = evt.data
        const Customer: custSchemaType = {
            clerkId: id,
            firstName: first_name!,
            lastName: last_name!,
            email: email_addresses[0].email_address,
            photo: image_url
        }

        const updatedCustomer: Icustomer = await updateCustomer(Customer)

        return NextResponse.json({"message":"OK","customer":updatedCustomer})
    }
    

    return new Response('', { status: 200 })
}