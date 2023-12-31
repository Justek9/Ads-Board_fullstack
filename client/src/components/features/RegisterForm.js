import { useState } from 'react'
import { Alert, Spinner, Button, Form } from 'react-bootstrap'
import { API_URL } from '../../config'
import styles from './RegisterForm.module.scss'

const RegisterForm = () => {
	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')
	const [avatar, setAvatar] = useState(null)
	const [avatarPreview, setAvatarPreview] = useState(null)
	const [tel, setTelNumber] = useState('')
	const [status, setStatus] = useState(null)
	// null, 'loading', 'success', 'serverError', 'clientError', 'loginError'

	const avatarChangeHandler = e => {
		const avatarImg = e.target.files[0]

		setAvatar(avatarImg)
		setAvatarPreview(URL.createObjectURL(avatarImg))
	}

	const handleSubmit = e => {
		e.preventDefault()
		setStatus('loading')

		const fd = new FormData()
		fd.append('login', login)
		fd.append('password', password)
		fd.append('avatar', avatar)
		fd.append('tel', tel)

		const options = {
			method: 'POST',
			body: fd,
		}
		fetch(`${API_URL}/auth/register`, options)
			.then(res => {
				if (res.status === 201) {
					setStatus('success')
					setLogin('')
					setPassword('')
					setAvatar('')
					setTelNumber('')
				} else if (res.status === 400) {
					setStatus('clientError')
				} else if (res.status === 409) {
					setStatus('loginError')
				} else {
					setStatus('serverError')
				}
			})
			.catch(err => console.log(err))
	}

	return (
		<Form onSubmit={handleSubmit} className='col-12 col-sm-3 mx-auto'>
			<h1>Sign up</h1>

			{status === 'success' && (
				<Alert variant='success'>
					<Alert.Heading>Success!</Alert.Heading>
					<p>You have been successfully registered. You can now login.</p>
				</Alert>
			)}

			{status === 'serverError' && (
				<Alert variant='danger'>
					<Alert.Heading>Something went wrong...</Alert.Heading>
					<p>Unexpected error...Try again!.</p>
				</Alert>
			)}

			{status === 'clientError' && (
				<Alert variant='danger'>
					<Alert.Heading>No enough data</Alert.Heading>
					<p>You have to fill in all the fields.</p>
				</Alert>
			)}

			{status === 'loginError' && (
				<Alert variant='warning'>
					<Alert.Heading>Login already in use</Alert.Heading>
					<p>Please choose another login.</p>
				</Alert>
			)}

			{status === 'loading' && (
				<Spinner animation='border' role='status'>
					<span className='visually-hidden'>Loading...</span>
				</Spinner>
			)}

			<Form.Group className='mb-3' controlId='formLogin'>
				<Form.Label>Login</Form.Label>
				<Form.Control
					type='text'
					value={login}
					onChange={e => setLogin(e.target.value)}
					placeholder='Enter login'
					required
				/>
			</Form.Group>

			<Form.Group className='mb-3' controlId='formPassword'>
				<Form.Label>Password</Form.Label>
				<Form.Control
					type='password'
					value={password}
					onChange={e => setPassword(e.target.value)}
					placeholder='Enter password'
					required
				/>
			</Form.Group>

			<Form.Group className='mb-3' controlId='formAvatar'>
				<Form.Label>Avatar</Form.Label>
				<Form.Control type='file' onChange={e => avatarChangeHandler(e)} required />
			</Form.Group>

			<div className='mb-3'>
				{avatarPreview && <Form.Label>Avatar preview</Form.Label>}
				{avatarPreview && <img src={avatarPreview} alt='avatar' className={styles.avatar}></img>}
			</div>

			<Form.Group className='mb-3' controlId='formTelephone'>
				<Form.Label>Telephone no.</Form.Label>
				<Form.Control
					type='tel'
					value={tel}
					onChange={e => setTelNumber(e.target.value)}
					placeholder='Telephone number'
					required
				/>
			</Form.Group>

			<Button variant='success' type='submit'>
				Register
			</Button>
		</Form>
	)
}

export default RegisterForm
