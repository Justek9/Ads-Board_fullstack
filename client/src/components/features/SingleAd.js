import { getAdbyId } from '../../redux/adsRedux'
import { useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { IMGS_URL } from '../../config'
import { useState } from 'react'
import DeleteModal from './DeleteModal'
import styles from './SingleAd.module.scss'
import { getUser } from '../../redux/userRedux'

const SingleAd = () => {
	const { id } = useParams()
	const ad = useSelector(state => getAdbyId(state, id))[0]
	const loggedUser = useSelector(getUser)
	const [modalShow, setModalShow] = useState(false)

	if (!ad) return

	return (
		<Card className={styles.card}>
			<Card.Img variant='top' src={IMGS_URL + ad.src} className={styles.img} />
			<Card.Body>
				<Card.Title>{ad.title}</Card.Title>
				<Card.Text>{ad.text}</Card.Text>
				<Card.Text>
					<b>Price:</b> ${ad.price}
				</Card.Text>

				<Card.Text>
					<b>Location:</b> {ad.location}
				</Card.Text>
				<Card.Text>
					<b>Published date / last edited:</b> {ad.date.substring(0, 10)}
				</Card.Text>

				<Card.Text>
					<b>Seller:</b>
					<img src={IMGS_URL + ad.user.avatar} className={styles.avatar} alt='user avatar'></img> {ad.user.login}
					<span>
						<b> Telephone no:</b> {ad.user.tel}
					</span>
				</Card.Text>

				{loggedUser && loggedUser.login === ad.user.login && (
					<div className={styles.btnContaier}>
						<Button className={styles.btn} variant='primary' as={NavLink} to={`/api/edit/${id}`}>
							Edit
						</Button>
						<Button className={styles.btn} variant='danger' onClick={() => setModalShow(true)}>
							Delete
						</Button>
					</div>
				)}
			</Card.Body>
			<DeleteModal id={ad._id} show={modalShow} onHide={() => setModalShow(false)} />
		</Card>
	)
}

export default SingleAd
