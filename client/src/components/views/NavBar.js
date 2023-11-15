import { Nav, Navbar } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

const NavBar = () => {
	return (
		<Navbar className='me-auto d-flex justify-content-between align-items-center bg-dark rounded mb-4'>
			<Nav.Link className='text-white' as={NavLink} to='/'>
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
