import Image from 'next/image'
import { Button, FloatingLabel, Spinner } from 'flowbite-react'
import { useState, type Dispatch, type SetStateAction } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { TInputsLogin } from '@/app/types'
import { loginSchema } from '@/app/zod-schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Icon, InputText } from '@/app/components'
import { loginUser } from '@/app/supabase/methods'
import toast from 'react-simple-toasts'
import 'react-simple-toasts/dist/theme/sunset.css'
import { MODAL_LOGIN, useModalStore } from '@/app/store/modalStore'

type Props = {
	setIsLogin: Dispatch<SetStateAction<boolean>>
}

const FormLogin = ({ setIsLogin }: Props) => {
	const [showPassword, setShowPassword] = useState(false)
	const onClose = useModalStore.use.onClose()

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<TInputsLogin>({
		resolver: zodResolver(loginSchema),
	})

	const onSubmit: SubmitHandler<TInputsLogin> = async (data) => {
		const { success, message } = await loginUser(data)

		!success &&
			toast(message, {
				duration: 2000,
				position: 'top-center',
				theme: 'sunset',
			})

		success && onClose(MODAL_LOGIN)
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
			<InputText
				name={'email'}
				label={'Correo electrónico'}
				error={errors?.email?.message}
				register={register}
				type={'email'}
				icon={null}
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
			/>

			<p className='text-sm text-blue-800 cursor-pointer'>¿Has olvidado tu contraseña?</p>
			<Button gradientMonochrome='info' type='submit'>
				{isSubmitting && <Spinner size='sm' className='mr-4' />}
				Enviar
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
