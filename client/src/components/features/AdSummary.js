import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import styles from './AdSummary.module.scss'
import { IMGS_URL } from '../../config'
import { NavLink } from 'react-router-dom'

const AdSummary = ({ ad }) => {
	return (
		<Card className={styles.card}>
			<Card.Img variant='top' src={IMGS_URL + ad.src} className={styles.img} />
			<Card.Body>
				<Card.Title>{ad.title}</Card.Title>
				<Card.Text>{ad.location}</Card.Text>
				<Button variant='secondary' as={NavLink} to={`/api/ads/${ad._id}`}>
					Read more
				</Button>
			</Card.Body>
		</Card>
	)
}

export default AdSummary
