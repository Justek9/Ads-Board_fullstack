import { Button } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import AllAds from '../features/AllAds'
import SearchBar from '../features/SearchBar'

const Home = () => {
	return (
		<>
			<div className='d-flex flex-row justify-content-start align-items-center'>
			
				<Button variant='success' as={NavLink} to='api/ad/add'>
					Add new ad
				</Button>
				<SearchBar />
			</div>
			<div className='d-flex justify-content-between flex-wrap mt-4'>
				<AllAds />
			</div>
		</>
	)
}

export default Home
