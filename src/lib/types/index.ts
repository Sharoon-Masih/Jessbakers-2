// Schema types
export type custSchemaType = {
    clerkId: string,
    firstName: string,
    lastName: string,
    email: string,
    photo: string
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