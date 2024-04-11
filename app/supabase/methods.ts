import { supabaseErrors } from '../constants'
import { supabase } from './client'

interface loginProps {
	email: string
	password: string
}

interface RegisterProps extends loginProps {
	name: string
	address: string
	phone: string
	city: string
}

export const loginUser = async ({ email, password }: loginProps) => {
	try {
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password,
		})

		if (error) throw error.message

		return { success: true }
	} catch (error: any) {
		return { success: false, message: supabaseErrors[error] }
	}
}

export const registerUser = async ({
	email,
	password,
	name,
	address,
	phone,
	city,
}: RegisterProps) => {
	try {
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				data: {
					name,
					address,
					phone,
					city,
					avatar_url:
						'https://zlphiklznxepieoewbpr.supabase.co/storage/v1/object/sign/avatars/male-1.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJhdmF0YXJzL21hbGUtMS5wbmciLCJpYXQiOjE3MTI4NjQzNDgsImV4cCI6NDg2NjQ2NDM0OH0.OS7yTUNTY3n_K3dMU7odK7EPEDTTjaGtask0Tu5-pmk&t=2024-04-11T19%3A39%3A08.513Z',
				},
			},
		})

		if (error) throw error.message

		//console.log(data)
		return { success: true, message: 'Registro exitoso' }
	} catch (error: any) {
		return { success: false, message: supabaseErrors[error] }
	}
}
