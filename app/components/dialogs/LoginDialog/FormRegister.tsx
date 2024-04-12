import { Avatar, Button, Dropdown, Label, Popover } from 'flowbite-react'
import { useRef, useState, type Dispatch, type SetStateAction } from 'react'
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
import { dropdownTheme } from '@/app/theme'

type Props = {
	setIsLogin: Dispatch<SetStateAction<boolean>>
}

const FormRegister = ({ setIsLogin }: Props) => {
	const [showPassword, setShowPassword] = useState(false)
	const avatars = useRef(
		Array(8)
			.fill(0)
			.reduce((acc, val, i) => {
				acc.push({
					gender: 'male',
					numImg: i + 1,
				})
				acc.push({
					gender: 'female',
					numImg: i + 1,
				})
				return acc
			}, [])
	)
	const [avatar, setAvatar] = useState<{ gender: string; numImg: number }>({
		gender: 'male',
		numImg: 1,
	})
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
					className='absolute top-[10px] right-2 z-30'
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
					className='absolute top-[10px] right-1 z-30 '
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
			avatar_url: `https://zlphiklznxepieoewbpr.supabase.co/storage/v1/object/public/avatars/${avatar.gender}-${avatar.numImg}.png`,
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
			<Popover
				aria-labelledby='default-popover'
				trigger='hover'
				placement='right'
				className='max-w-40 sm:max-w-lg md:max-w-xl z-50 bg-white shadow shadow-black/50 rounded'
				content={
					<>
						<div className='flex items-center flex-wrap gap-3 px-1'>
							{avatars.current
								.filter((avatar: { gender: string; numImg: number }) => avatar.gender === 'female')
								.map((el: { gender: string; numImg: number }) => (
									<Avatar
										img={`https://zlphiklznxepieoewbpr.supabase.co/storage/v1/object/public/avatars/${el.gender}-${el.numImg}.png`}
										size='md'
										alt={`avatar ${el.numImg}`}
										key={el.numImg}
										className='my-1 p-1 border border-gray-300 hover:ring-cyan-500 hover:bg-gray-200 hover:ring-1 cursor-pointer'
										onClick={() => setAvatar(el)}
									/>
								))}
						</div>
						<div className='w-full border-b border-gray-300' />

						<div className='flex items-center flex-wrap gap-3 px-1'>
							{avatars.current
								.filter((avatar: { gender: string; numImg: number }) => avatar.gender === 'male')
								.map((el: { gender: string; numImg: number }) => (
									<Avatar
										img={`https://zlphiklznxepieoewbpr.supabase.co/storage/v1/object/public/avatars/${el.gender}-${el.numImg}.png`}
										size='md'
										alt={`avatar ${el.numImg}`}
										key={el.numImg}
										className='my-1 p-1 border border-gray-300 hover:ring-cyan-500 hover:bg-gray-200 hover:ring-1 cursor-pointer'
										onClick={() => setAvatar(el)}
									/>
								))}
						</div>
					</>
				}
				arrow={false}>
				<div className='flex flex-col w-fit'>
					<span className='text-xs'>Seleccionar</span>
					<span className='text-xs'>Avatar</span>
					<Avatar
						img={`https://zlphiklznxepieoewbpr.supabase.co/storage/v1/object/public/avatars/${avatar.gender}-${avatar.numImg}.png`}
						size='lg'
						alt='avatar user'
						className='flex border border-gray-500 hover:ring-1 hover:ring-cyan-500 w-20'
					/>
				</div>
			</Popover>
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

/* 
<Dropdown
				label={
					<div className='flex flex-col'>
						<span className='text-xs'>Seleccionar</span>
						<span className='text-xs'>Avatar</span>
						<Avatar
							img={`https://zlphiklznxepieoewbpr.supabase.co/storage/v1/object/public/avatars/${avatar.gender}-${avatar.numImg}.png`}
							size='lg'
							alt='avatar user'
							className='flex border border-gray-500 hover:ring-1 hover:ring-cyan-500 w-20'
						/>
					</div>
				}
				arrowIcon={false}
				theme={dropdownTheme}
				inline>
				<div className='flex items-center flex-wrap'>
					{avatars.current
						.filter((avatar: { gender: string; numImg: number }) => avatar.gender === 'female')
						.map((el: { gender: string; numImg: number }) => (
							<Dropdown.Item key={el.numImg} onClick={() => setAvatar(el)}>
								<Avatar
									img={`https://zlphiklznxepieoewbpr.supabase.co/storage/v1/object/public/avatars/${el.gender}-${el.numImg}.png`}
									size='md'
									alt={`avatar ${el.numImg}`}
								/>
							</Dropdown.Item>
						))}
				</div>
				<Dropdown.Divider />

				<div className='flex items-center flex-wrap'>
					{avatars.current
						.filter((avatar: { gender: string; numImg: number }) => avatar.gender === 'male')
						.map((el: { gender: string; numImg: number }) => (
							<Dropdown.Item key={el.numImg} onClick={() => setAvatar(el)}>
								<Avatar
									img={`https://zlphiklznxepieoewbpr.supabase.co/storage/v1/object/public/avatars/${el.gender}-${el.numImg}.png`}
									size='md'
									alt={`avatar ${el.numImg}`}
								/>
							</Dropdown.Item>
						))}
				</div>
			</Dropdown>


*/
