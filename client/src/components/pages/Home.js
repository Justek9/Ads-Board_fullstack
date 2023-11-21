import { Button, Spinner } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getIsError } from '../../redux/errorRedux'
import { getIsLoading } from '../../redux/isLoadingRedux'
import { getUser } from '../../redux/userRedux'
import AllAds from '../features/AllAds'
import SearchBar from '../features/SearchBar'
import styles from './Home.module.scss'

const Home = () => {
	const loggedUser = useSelector(state => getUser(state))
	const isLoading = useSelector(state => getIsLoading(state))
	const isError = useSelector(state => getIsError(state))

	return (
		<>
			<div className='d-flex flex-row justify-content-start align-items-center'>
				<Button variant='success' as={NavLink} to='api/ad/add' className={styles.btn} disabled={!loggedUser}>
					Add new ad
				</Button>

				<SearchBar />
			</div>
			{!isLoading && !isError && (
				<div className='d-flex justify-content-between flex-wrap mt-4'>
					<AllAds />
				</div>
			)}
			{isError && <p>Error occured while fetching data...</p>}
			{isLoading && <Spinner animation='border' variant='success' />}
		</>
	)
}

export default Home
