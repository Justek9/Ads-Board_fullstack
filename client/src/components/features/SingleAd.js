import { getAdbyId } from '../../redux/adsRedux'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { IMGS_URL } from '../../config'
import { NavLink } from 'react-router-dom'

const SingleAd = () => {
	const { id } = useParams()
	const ad = useSelector(state => getAdbyId(state, id))[0]

	return (
		<Card>
			<Card.Img variant='top' src={IMGS_URL + ad.photo} />
			<Card.Body>
				<Card.Title>{ad.title}</Card.Title>
				<Card.Text>{ad.location}</Card.Text>

				<Button variant='primary'>Edit</Button>
				<Button variant='danger'>Delete</Button>
			</Card.Body>
		</Card>
	)
}

export default SingleAd
