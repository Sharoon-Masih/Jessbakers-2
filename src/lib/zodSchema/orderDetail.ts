import { z } from "zod"
const phoneRegex = /^(\d{11})$/;
export const orderDetail=z.object({
    address:z.string().max(500,'max character 500'),
    contact:z.string().regex(phoneRegex,"invalid contact")
})