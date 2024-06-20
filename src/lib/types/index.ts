// Schema types
export type custSchemaType = {
    clerkId: string,
    firstName: string,
    lastName: string,
    email: string,
    photo: string
}

export type addToCartSchemaType = {
    name: string,
    price: number,
    description: string,
    image: string,
    sanityId: string,
    currency: string,
    slug: string,
    category: string,
    size: string,
    qty: number
    instruction?: string,
    customer: string

}

export type orderSchemaType = {
    // itemList?: {
    //     itemName: string,
    //     price: string,
    //     qty: number,
    //     cartItem_Id: string
    // }[],
    stripeId: string,
    totalPrice: number,
    created_At: string,
    address: string,
    contact: string,
    customer: string,
    orderedProduct: string
}

export type ItemSchemaType = {

    itemName: string,
    price: number,
    qty: number,
    desc: string,
    img:string

}
export type orderedProductSchemaType = {
    itemList:ItemSchemaType[],
    created_At:string
    customer: string
}
//server action param
export type deleteCustParams = {
    id: string
}

export type itemListParams = {
    price_data: {
        currency: string;
        unit_amount: number;
        product_data: {
            name: string,
            metadata: {
                name: string,
                price: number,
                size: string,
                qty: number,
                sanityId: string,
                img: string
            }
        };
    };
    quantity: number;


}
//handle error func
export function handleError(error: unknown) {
    console.log(error);
    throw new Error(typeof error === "string" ? error : (JSON.stringify(error)))
}