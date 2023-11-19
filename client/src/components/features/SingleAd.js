import { getAdbyId } from '../../redux/adsRedux'
import { useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { IMGS_URL } from '../../config'
import { useState } from 'react'
import DeleteModal from './DeleteModal'
import styles from './SingleAd.module.scss'

const SingleAd = () => {
	const { id } = useParams()
	const ad = useSelector(state => getAdbyId(state, id))[0]
	console.log(ad)
	const [modalShow, setModalShow] = useState(false)

	return (
		<Card className={styles.card}>
			<Card.Img variant='top' src={IMGS_URL + ad.src} className={styles.img} />
			<Card.Body>
				<Card.Title>{ad.title}</Card.Title>
				<Card.Text>{ad.text}</Card.Text>
				<Card.Text>Price: ${ad.price}</Card.Text>
				<Card.Text>Seller: {ad.user.login}</Card.Text>
				<Card.Text>Location: {ad.location}</Card.Text>
				<Card.Text>Published date: {ad.date.substring(0, 10)}</Card.Text>
				<div className={styles.btnContaier}>
					<Button className={styles.btn} variant='primary' as={NavLink} to={`/api/edit/${id}`}>
						Edit
					</Button>
					<Button className={styles.btn} variant='danger' onClick={() => setModalShow(true)}>
						Delete
					</Button>
				</div>
			</Card.Body>
			<DeleteModal id={ad._id} show={modalShow} onHide={() => setModalShow(false)} />
		</Card>
	)
}

export default SingleAd
