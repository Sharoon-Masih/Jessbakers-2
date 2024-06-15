// Schema types
export type custSchemaType = {
    clerkId: string,
    firstName: string,
    lastName: string,
    email: string,
    photo: string
}

export type     addToCartSchemaType = {
    name:string,
    price:number,
    description:string,
    image:string,
    sanityId:string,
    currency:string,
    slug:string,
    category:string,
    size:string,
    qty:number
    instruction?:string,
    customer:string

}
//server action param
export type deleteCustParams = {
    id: string
}

//handle error func
export function handleError(error: unknown) {
    console.log(error);
    throw new Error(typeof error === "string" ? error : (JSON.stringify(error)))
}