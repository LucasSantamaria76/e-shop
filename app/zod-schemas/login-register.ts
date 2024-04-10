import { z } from 'zod'

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

export const loginSchema = z.object({
	email: z
		.string()
		.min(1, {
			message: 'El correo es requerido',
		})
		.email({
			message: 'Correo inválido',
		}),
	password: z.string().min(6, { message: 'Debe tener 6 o más caracteres' }),
})

export const registerSchema = loginSchema
	.merge(
		z.object({
			name: z
				.string({
					required_error: 'El nombre es requerido',
				})
				.min(1, {
					message: 'El nombre es requerido',
				}),
			confirmPassword: z.string(),
			address: z.string(),
			phone: z.string().min(10, { message: 'Debe tener 10 o más caracteres' }),
			city: z.string(),
			avatar: z
				.any()
				.refine((files) => files.length === 0 || ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
					message: 'Se aceptan archivos .jpg, .jpeg, .png y .webp solamente.',
				})
				.optional(),
		})
	)
	.partial({
		address: true,
		phone: true,
		city: true,
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Las contraseñas no coinciden',
		path: ['confirmPassword'],
	})
