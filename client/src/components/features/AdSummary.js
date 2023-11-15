import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import styles from './AdSummary.module.scss'

const AdSummary = () => {
	return (
		<Card className={styles.card}>
			<Card.Img variant='top' src='holder.js/100px180' />
			<Card.Body>
				<Card.Title>Title</Card.Title>
				<Card.Text>Lorem ipsum lorem ipsum</Card.Text>
				<Button variant='secondary'>Read more</Button>
			</Card.Body>
		</Card>
	)
}

export default AdSummary
