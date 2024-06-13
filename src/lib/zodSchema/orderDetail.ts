import { z } from "zod"

export const orderDetail=z.object({
    address:z.string().max(500,'max character 500'),
    contact:z.string().max(11,'max length 11')
})