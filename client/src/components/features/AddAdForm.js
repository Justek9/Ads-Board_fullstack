import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addAdRequest } from '../../redux/adsRedux'

const AdAddForm = () => {
	const [title, setTitle] = useState('')
	const [text, setText] = useState('')
	const [price, setPrice] = useState('')
	const [location, setLocation] = useState('')
	const [image, setImage] = useState(null)
	const  date = new Date()
	const user = '6559b05a19363e4b65f20de1'

	const navigate = useNavigate()
	const dispatch = useDispatch()

	const handleSubmit = event => {
		event.preventDefault()

		const fd = new FormData()
		fd.append('title', title)
		fd.append('text', text)
		fd.append('price', price)
		fd.append('location', location)
		fd.append('src', image)
		fd.append('date', date)
		fd.append('user', user)

		dispatch(addAdRequest(fd))
		
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
				Add
			</Button>
		</Form>
	)
}

export default AdAddForm
