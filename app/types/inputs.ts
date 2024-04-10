import { z } from 'zod'
import { loginSchema, registerSchema } from '../zod-schemas'

export type TInputsLogin = z.infer<typeof loginSchema>

export type TInputsRegister = z.infer<typeof registerSchema>
