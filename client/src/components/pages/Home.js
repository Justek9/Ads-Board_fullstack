import { Button } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import AllAds from '../features/AllAds'

const Home = () => {
	return (
		<>
			<Button variant='success' as={NavLink} to='api/ad/add'>Add new ad</Button>
			<div className='d-flex justify-content-between flex-wrap mt-4'>
				<AllAds />
			</div>
		</>
	)
}

export default Home
