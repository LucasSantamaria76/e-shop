import { FloatingLabel } from 'flowbite-react'

type Props = {
	name: string
	label: string
	error: string | undefined
	icon: React.ReactNode
	register: any
	type: string
	fullWidth?: boolean
}

const InputText = ({ name, label, error, icon, register, type, fullWidth = false }: Props) => {
	return (
		<div className={`relative ${fullWidth && 'col-span-2'}`}>
			<FloatingLabel
				type={type}
				variant='outlined'
				label={label}
				sizing='sm'
				color={!error ? 'default' : 'error'}
				className='tracking-wider'
				{...register(name)}
			/>
			{icon}
			{error ? <p className='absolute -bottom-2 left-1 text-[10px] text-red-500'>{error}</p> : null}
		</div>
	)
}
export default InputText
