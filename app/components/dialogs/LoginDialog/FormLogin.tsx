import Image from 'next/image'
import { Button, FloatingLabel } from 'flowbite-react'
import { useState, type Dispatch, type SetStateAction } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { TInputsLogin } from '@/app/types'
import { loginSchema } from '@/app/zod-schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Icon, InputText } from '@/app/components'

type Props = {
	setIsLogin: Dispatch<SetStateAction<boolean>>
}

const FormLogin = ({ setIsLogin }: Props) => {
	const [showPassword, setShowPassword] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<TInputsLogin>({
		resolver: zodResolver(loginSchema),
	})

	const onSubmit: SubmitHandler<TInputsLogin> = (data) => console.log(data)

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
			<InputText
				name={'email'}
				label={'Correo electrónico'}
				error={errors?.email?.message}
				register={register}
				type={'email'}
				icon={null}
				colSpan=''
			/>
			<InputText
				name='password'
				label={'Contraseña'}
				error={errors?.password?.message}
				register={register}
				type={showPassword ? 'text' : 'password'}
				icon={
					<Icon
						name={showPassword ? 'EyeOff' : 'Eye'}
						className='absolute top-[10px] right-1 z-50 '
						onClick={() => setShowPassword(!showPassword)}
					/>
				}
				colSpan={''}
			/>

			<p className='text-sm text-blue-800 cursor-pointer'>¿Has olvidado tu contraseña?</p>
			<Button gradientMonochrome='info' type='submit'>
				Enviar
				{/* <RiMailSendLine className='ml-4 h-5 w-5' /> */}
			</Button>
			<span className='border-b border-black my-2' />
			<Button outline gradientDuoTone='pinkToOrange'>
				Inicia sesión con
				<Image
					src={'/google.png'}
					width={50}
					height={10}
					alt='logo google'
					className='h-5 w-20 ml-2'
				/>
			</Button>

			<p className='text-sm'>
				¿No tienes una cuenta?
				<span
					className='text-sm text-blue-800 cursor-pointer ml-2'
					onClick={() => setIsLogin(false)}>
					Regístrate
				</span>
			</p>
		</form>
	)
}
export default FormLogin
