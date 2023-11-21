import { Alert, Spinner, Form, Button } from 'react-bootstrap'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAds } from '../../redux/adsRedux'
import { getUser } from '../../redux/userRedux'
import { API_URL } from '../../config'

const AddAndEditForm = ({ action, ...props }) => {
	const [title, setTitle] = useState(props.title || '')
	const [text, setText] = useState(props.text || '')
	const [price, setPrice] = useState(props.price || '')
	const [location, setLocation] = useState(props.location || '')
	const [image, setImage] = useState(null)
	const [status, setStatus] = useState(null)
	// null, 'loading', 'success', 'serverError',

	const loggedUserId = useSelector(getUser).id

	const navigate = useNavigate()
	const dispatch = useDispatch()

	const clearStatusandNavigateToHomePage = () => {
		setTimeout(() => {
			setStatus(null)
			navigate('/')
		}, 2000)
	}

	const handleSubmit = event => {
		event.preventDefault()

		setStatus('loading')

		const fd = new FormData()
		fd.append('title', title)
		fd.append('text', text)
		fd.append('price', price)
		fd.append('location', location)
		fd.append('src', image)
		fd.append('date', new Date())
		fd.append('user', loggedUserId)

		const options = {
			method: action === 'Add' ? 'POST' : 'PUT',
			body: fd,
			credentials: 'include',
		}
		fetch(action === 'Add' ? `${API_URL}/ads` : `${API_URL}/edit/${props.id}`, options)
			.then(res => {
				if (res.status === 200) {
					setStatus('success')
					clearStatusandNavigateToHomePage()
					dispatch(fetchAds())
				} else {
					setStatus('serverError')
				}
			})
			.catch(() => setStatus('serverError'))
	}

	return (
		<Form onSubmit={handleSubmit}>
			{status === 'success' && (
				<Alert variant='success'>
					<Alert.Heading>Success!</Alert.Heading>
				</Alert>
			)}

			{status === 'serverError' && (
				<Alert variant='danger'>
					<Alert.Heading>Something went wrong...</Alert.Heading>
					<p>Make sure all the fields are filled and try agai!.</p>
				</Alert>
			)}

			{status === 'loading' && (
				<Spinner animation='border' role='status'>
					<span className='visually-hidden'>Loading...</span>
				</Spinner>
			)}

			<Form.Group className='mb-3 d-flex flex-row align-items-center justify-content-between'>
				<Form.Label>Title</Form.Label>
				<Form.Control
					aria-label='Title'
					className='w-75'
					value={title}
					onChange={e => setTitle(e.target.value)}
					minLength={10}
					maxLength={50}
				/>
			</Form.Group>
			<Form.Group className='mb-3 d-flex flex-row align-items-center justify-content-between'>
				<Form.Label>Description</Form.Label>

				<textarea
					className='form-control w-75'
					id='exampleFormControlTextarea1'
					rows='8'
					aria-label='Description'
					value={text}
					onChange={e => setText(e.target.value)}
					minLength={20}
					maxLength={1000}
				/>
			</Form.Group>
			<Form.Group className='mb-3 d-flex flex-row align-items-center justify-content-between'>
				<Form.Label className='mr-2'>Location:</Form.Label>
				<Form.Control type='text' className='w-75' value={location} onChange={e => setLocation(e.target.value)} />
			</Form.Group>
			<Form.Group className='mb-3 d-flex flex-row align-items-center justify-content-between'>
				<Form.Label className='mr-2'>Price:</Form.Label>
				<Form.Control type='number' className='w-75' value={price} onChange={e => setPrice(e.target.value)} />
			</Form.Group>
			<Form.Group className='mb-3 d-flex flex-row align-items-center justify-content-between'>
				<Form.Label className='mr-2'>Img:</Form.Label>
				<Form.Control type='file' className='w-75' onChange={e => setImage(e.target.files[0])} />
			</Form.Group>

			<Button variant='success' type='submit'>
				Confirm
			</Button>
		</Form>
	)
}

export default AddAndEditForm
