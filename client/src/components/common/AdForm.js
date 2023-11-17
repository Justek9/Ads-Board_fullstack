import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import { useState } from 'react'

const AdForm = ({ action, actionText, ...props }) => {
	const [title, setTitle] = useState(props.title || '')
	const [text, setText] = useState(props.text || '')
	const [price, setPrice] = useState(props.price || '')
	const [location, setLocation] = useState(props.location || '')
	const [image, setImage] = useState(props.image || '')

	let date = 'g'
	let src = image
	let user = 'justek'
	let id = props.id

	const handleImageChange = e => {
		const file = e.target.files[0]
		setImage(file)
	}
	const handleSubmit = event => {
		event.preventDefault()
		action({ title, text, price, location, src, id, date, user })
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
				<Form.Control type='file' className='w-75' onChange={handleImageChange} />
			</Form.Group>

			<Button variant='success' type='submit'>
				{actionText}
			</Button>
		</Form>
	)
}

export default AdForm
