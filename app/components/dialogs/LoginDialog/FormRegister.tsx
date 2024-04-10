import { Button, FileInput, FloatingLabel, Label } from 'flowbite-react'
import { useState, type Dispatch, type SetStateAction } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { TInputsRegister } from '@/app/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema } from '@/app/zod-schemas'
import { InputText } from '@/app/components'
import { Icon } from '@/app/components'

type Props = {
	setIsLogin: Dispatch<SetStateAction<boolean>>
}

const FormRegister = ({ setIsLogin }: Props) => {
	const [showPassword, setShowPassword] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<TInputsRegister>({
		resolver: zodResolver(registerSchema),
	})

	const onSubmit: SubmitHandler<TInputsRegister> = (data) => console.log(data)

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
			fullWidth: false,
		},
		{
			name: 'phone',
			label: 'Teléfono',
			type: 'text',
			icon: null,
			fullWidth: false,
		},
		{
			name: 'address',
			label: 'Domicilio',
			type: 'text',
			icon: null,
			fullWidth: false,
		},
		{
			name: 'city',
			label: 'Ciudad',
			type: 'text',
			icon: null,
			fullWidth: false,
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
			fullWidth: false,
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
			fullWidth: false,
		},
	]

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
				<div className='col-span-2 mb-4'>
					<Label htmlFor='file-upload' value='Avatar' className='text-xs ml-1' />
					<FileInput id='file-upload' {...register('avatar')} />
					{errors?.avatar ? (
						//@ts-ignore
						<p className='text-xs text-red-500'>{errors?.avatar?.message}</p>
					) : null}
				</div>
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
