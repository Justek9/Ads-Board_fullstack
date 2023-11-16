import { Nav, Navbar } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { fetchAds } from '../../redux/adsRedux'

const NavBar = () => {
	const dispatch = useDispatch()
	const handleClick = () => {
		dispatch(fetchAds())
	}
	return (
		<Navbar className='me-auto d-flex justify-content-between align-items-center bg-dark rounded mb-4'>
			<Nav.Link className='text-white' as={NavLink} to='/' onClick={handleClick}>
				Home
			</Nav.Link>
			<Nav>
				<Nav.Link className='text-white' as={NavLink} to='/'>
					Sign Up
				</Nav.Link>
				<Nav.Link className='text-white' as={NavLink} to='/'>
					Login
				</Nav.Link>
			</Nav>
		</Navbar>
	)
}

export default NavBar
