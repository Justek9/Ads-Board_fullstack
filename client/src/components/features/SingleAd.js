import { getAdbyId } from '../../redux/adsRedux'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { IMGS_URL } from '../../config'
import { useState } from 'react'
import DeleteModal from './DeleteModal'

const SingleAd = () => {
	const { id } = useParams()
	const ad = useSelector(state => getAdbyId(state, id))[0]
	const [modalShow, setModalShow] = useState(false)
	
	return (
		<Card>
			<Card.Img variant='top' src={IMGS_URL + ad.src} />
			<Card.Body>
				<Card.Title>{ad.title}</Card.Title>
				<Card.Text>{ad.location}</Card.Text>

				<Button variant='primary'>Edit</Button>
				<Button variant='danger' onClick={() => setModalShow(true)}>
					Delete
				</Button>
			</Card.Body>
			<DeleteModal id={ad._id} show={modalShow} onHide={() => setModalShow(false)} />
		</Card>
	)
}

export default SingleAd
