import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { editAd, editAdRequest } from '../../redux/adsRedux'
import { API_URL } from '../../config'

const AdForm = ({ action, actionText, ...props }) => {
	const [title, setTitle] = useState(props.title || '')
	const [text, setText] = useState(props.text || '')
	const [price, setPrice] = useState(props.price || '')
	const [location, setLocation] = useState(props.location || '')
	const [image, setImage] = useState(props.image || null)

	let date = 'g'
	let src = image
	let user = 'justek'
	let id = props.id

	const navigate = useNavigate()
	const dispatch = useDispatch()

	const handleSubmit = event => {
		event.preventDefault()
		// action({ title, text, price, location, src, id, date, user })

		const fd = new FormData()
		fd.append('title', title)
		fd.append('text', text)
		fd.append('price', price)
		fd.append('location', location)
		fd.append('src', src)
		fd.append('id', id)
		fd.append('date', date)
		fd.append('user', user)

		const options = {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: fd,
		}
		fetch(`${API_URL}/edit/${id}`, options).then(() => console.log('ok'))
		navigate('/')
	}

	return (
		<Form onSubmit={handleSubmit}>
			<Form.Group className='mb-3 d-flex flex-row align-items-center justify-content-between'>
				<Form.Label>Title</Form.Label>
				<Form.Control aria-label='Title' className='w-75' value={title} onChange={e => setTitle(e.target.value)} />
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
				{actionText}
			</Button>
		</Form>
	)
}

export default AdForm
