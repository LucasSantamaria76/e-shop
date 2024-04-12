'use client'

import { useModalStore, MODAL_LOGIN } from '@/app/store/modalStore'
import { Modal } from 'flowbite-react'
import { modalTheme } from '@/app/theme'
import { useState } from 'react'
import FormLogin from './FormLogin'
import FormRegister from './FormRegister'

const LoginDialog = () => {
	const onClose = useModalStore.use.onClose()
	const isOpen = useModalStore.use[MODAL_LOGIN]()
	const [isLogin, setIsLogin] = useState(true)

	return (
		<Modal
			dismissible
			show={isOpen}
			theme={modalTheme}
			position='center'
			onClose={() => onClose(MODAL_LOGIN)}
			className='z-50'>
			<Modal.Header>{isLogin ? 'Ingrese a su cuenta' : 'Registrarse'}</Modal.Header>
			<Modal.Body>
				{isLogin ? <FormLogin setIsLogin={setIsLogin} /> : <FormRegister setIsLogin={setIsLogin} />}
			</Modal.Body>
		</Modal>
	)
}
export default LoginDialog
