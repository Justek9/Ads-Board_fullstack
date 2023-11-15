import { Container } from 'react-bootstrap'
import './App.css'
import Home from './components/pages/Home'
import NavBar from './components/views/NavBar'
import { useEffect } from 'react'
import { fetchAds } from './redux/adsRedux'
import { useDispatch } from 'react-redux'

const App = () => {
	const dispatch = useDispatch()

	// fetch ads from server and add them to initial state
	useEffect(() => dispatch(fetchAds()), [dispatch])

	return (
		<Container>
			<NavBar />
			<Home />
		</Container>
	)
}

export default App
