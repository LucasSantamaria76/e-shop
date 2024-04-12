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
	avatar_url: string
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
	avatar_url,
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
					avatar_url,
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
