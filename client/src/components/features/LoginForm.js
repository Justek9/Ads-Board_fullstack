import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const LoginForm = () => {
	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')
	const handleSubmit = () => {}

	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group className='mb-3 w-50' controlId='formLogin'>
				<Form.Label>Login</Form.Label>
				<Form.Control type='text' value={login} onChange={e => setLogin(e.target.value)} placeholder='Enter login' />
			</Form.Group>

			<Form.Group className='mb-3 w-50' controlId='formPassword'>
				<Form.Label>Password</Form.Label>
				<Form.Control
					type='password'
					value={password}
					onChange={e => setPassword(e.target.value)}
					placeholder='Enter password'
				/>
			</Form.Group>

			<Button variant='success' type='submit'>
				Log In
			</Button>
		</Form>
	)
}

export default LoginForm
