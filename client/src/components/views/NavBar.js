import { Nav, Navbar } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { fetchAds } from '../../redux/adsRedux'
import { getUser } from '../../redux/userRedux'

const NavBar = () => {
	const dispatch = useDispatch()
	const handleClick = () => {
		dispatch(fetchAds())
	}

	const user = useSelector(getUser)
	
	return (
		<Navbar className='me-auto d-flex justify-content-between align-items-center bg-dark rounded mb-4'>
			<Nav.Link className='text-white' as={NavLink} to='/' onClick={handleClick}>
				Home
			</Nav.Link>
			<Nav>
				{!user && (
					<Nav.Link className='text-white' as={NavLink} to='/register'>
						Sign Up
					</Nav.Link>
				)}
				{!user && (
					<Nav.Link className='text-white' as={NavLink} to='/login'>
						Login
					</Nav.Link>
				)}
				{user && <Nav.Link className='text-white'>User: {user.login}</Nav.Link>}
				{user && (
					<Nav.Link className='text-white' as={NavLink} to='/logout'>
						Log out
					</Nav.Link>
				)}
			</Nav>
		</Navbar>
	)
}

export default NavBar
