import { useState } from 'react'
import { Alert, Spinner } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { API_URL } from '../../config'
import { loginUser } from '../../redux/userRedux'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
	const [login, setLogin] = useState('')
	const [password, setPassword] = useState('')
	const [status, setStatus] = useState(null)
	// null, 'loading', 'success', 'serverError', 'clientError'

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const handleSubmit = e => {
		e.preventDefault()
		const options = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ login, password }),
		}

		setStatus('loading')
		fetch(`${API_URL}/auth/login`, options)
			.then(res => {
				if (res.status === 200) {
					setStatus('success')
					navigate('/')
				} else if (res.status === 400) {
					setStatus('clientError')
				} else if (res.status === 401) {
					setStatus('loginError')
				} else {
					setStatus('serverError')
				}
			})
			.catch(err => setStatus('serverError'))

		const options2 = {
			method: 'GET',
		}

		fetch(`${API_URL}/auth/user`, options2)
			.then(res => {
				return res.json()
			})
			.then(user => {
				dispatch(loginUser(user))
			})
			.catch(error => {
				console.error(error)
			})
	}

	return (
		<Form onSubmit={handleSubmit} className='col-12 col-sm-3 mx-auto'>
			<h1 className='my-4'>Login</h1>
			{status === 'success' && (
				<Alert variant='success'>
					<Alert.Heading>Success!</Alert.Heading>
					<p>You have been successfully logged in.</p>
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
				<Alert variant='danger'>
					<Alert.Heading>Incorrect data </Alert.Heading>
					<p>Login or password is incorrect</p>
				</Alert>
			)}

			{status === 'loading' && (
				<Spinner animation='border' role='status'>
					<span className='visually-hidden'>Loading...</span>
				</Spinner>
			)}

			<Form.Group className='mb-3' controlId='formLogin'>
				<Form.Label>Login</Form.Label>
				<Form.Control type='text' value={login} onChange={e => setLogin(e.target.value)} placeholder='Enter login' />
			</Form.Group>

			<Form.Group className='mb-3' controlId='formPassword'>
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
