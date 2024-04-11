import { Button } from 'flowbite-react'
import { useState, type Dispatch, type SetStateAction } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { TInputsRegister } from '@/app/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema } from '@/app/zod-schemas'
import { InputText } from '@/app/components'
import { Icon } from '@/app/components'
import { registerUser } from '@/app/supabase/methods'
import toast from 'react-simple-toasts'
import 'react-simple-toasts/dist/theme/sunset.css'
import 'react-simple-toasts/dist/theme/ocean-wave.css'
import { MODAL_LOGIN, useModalStore } from '@/app/store/modalStore'

type Props = {
	setIsLogin: Dispatch<SetStateAction<boolean>>
}

const FormRegister = ({ setIsLogin }: Props) => {
	const [showPassword, setShowPassword] = useState(false)
	const onClose = useModalStore.use.onClose()

	const fields = [
		{
			name: 'email',
			label: 'Correo electrónico',
			type: 'email',
			icon: null,
			fullWidth: true,
		},
		{
			name: 'name',
			label: 'Nombre',
			type: 'text',
			icon: null,
		},
		{
			name: 'phone',
			label: 'Teléfono',
			type: 'text',
			icon: null,
		},
		{
			name: 'address',
			label: 'Domicilio',
			type: 'text',
			icon: null,
		},
		{
			name: 'city',
			label: 'Ciudad',
			type: 'text',
			icon: null,
		},
		{
			name: 'password',
			label: 'Contraseña',
			type: showPassword ? 'text' : 'password',
			icon: (
				<Icon
					name={showPassword ? 'EyeOff' : 'Eye'}
					className='absolute top-[10px] right-2 z-50'
					onClick={() => setShowPassword(!showPassword)}
				/>
			),
		},
		{
			name: 'confirmPassword',
			label: 'Confirmar contraseña',
			type: showPassword ? 'text' : 'password',
			icon: (
				<Icon
					name={showPassword ? 'EyeOff' : 'Eye'}
					className='absolute top-[10px] right-1 z-50 '
					onClick={() => setShowPassword(!showPassword)}
				/>
			),
		},
	]

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<TInputsRegister>({
		resolver: zodResolver(registerSchema),
	})

	const onSubmit: SubmitHandler<TInputsRegister> = async ({
		email,
		password,
		name,
		address,
		phone,
		city,
	}) => {
		const { message, success } = await registerUser({
			email,
			password,
			name,
			address: address || '',
			phone: phone || '',
			city: city || '',
		})

		toast(message, {
			duration: 2000,
			position: 'top-center',
			theme: success ? 'ocean-wave' : 'sunset',
		})

		success && onClose(MODAL_LOGIN)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
			<div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
				{fields.map((field) => (
					<InputText
						key={field.name}
						name={field.name}
						label={field.label}
						//@ts-ignore
						error={errors[field.name] ? errors[field.name]?.message! : ''}
						register={register}
						type={field.type}
						icon={field.icon}
						fullWidth={field.fullWidth}
					/>
				))}
			</div>
			<Button gradientMonochrome='info' type='submit'>
				Enviar
			</Button>
			<span className='border-b border-black my-2' />

			<p className='text-sm'>
				¿Ya tienes una cuenta?
				<span
					className='text-sm text-blue-800 cursor-pointer ml-2'
					onClick={() => setIsLogin(true)}>
					Inicia sesión
				</span>
			</p>
		</form>
	)
}
export default FormRegister
