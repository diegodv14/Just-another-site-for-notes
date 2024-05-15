import { z } from 'zod'


export const authSchema = z.object({
    username: z.string({
        required_error: 'username is required'
    }),
    password: z.string({
        required_error: "the password is required"
    })

})


