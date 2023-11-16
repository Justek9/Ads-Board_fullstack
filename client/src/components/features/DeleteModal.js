import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteAdRequest } from '../../redux/adsRedux'

const DeleteModal = props => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const handleRemoveAd = e => {
		dispatch(deleteAdRequest(props.id))
		props.onHide()
		navigate('/')
	}

	return (
		<Modal {...props} size='lg' aria-labelledby='contained-modal-title-vcenter' centered>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>Are you sure?</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p>This operation will completely remove this ad from the app. Are you sure you want to do this?</p>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='secondary' onClick={props.onHide}>
					Cancel
				</Button>
				<Button variant='danger' onClick={handleRemoveAd}>
					Remove
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default DeleteModal
