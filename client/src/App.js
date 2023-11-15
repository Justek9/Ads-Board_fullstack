import { Container } from 'react-bootstrap'
import Home from './components/pages/Home'
import NavBar from './components/views/NavBar'
import { useEffect } from 'react'
import { fetchAds } from './redux/adsRedux'
import { useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import SingleAd from './components/features/SingleAd'

const App = () => {
	const dispatch = useDispatch()

	// fetch ads from server and add them to initial state
	useEffect(() => dispatch(fetchAds()), [dispatch])

	return (
		<Container>
			<NavBar />
			<Routes>
				<Route path='/' element={<Home />}></Route>
				<Route path='api/ads/:id' element={<SingleAd />}></Route>
			</Routes>
		</Container>
	)
}

export default App
