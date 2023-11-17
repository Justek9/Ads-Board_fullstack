import { Container } from 'react-bootstrap'
import Home from './components/pages/Home'
import NavBar from './components/views/NavBar'
import { useEffect } from 'react'
import { fetchAds } from './redux/adsRedux'
import { useDispatch } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import SingleAd from './components/features/SingleAd'
import AddAd from './components/pages/AddAd'
import EditAdForm from './components/features/EditAdForm'
import LoginForm from './components/features/LoginForm'
import RegisterForm from './components/features/RegisterForm'

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
				<Route path='api/ad/add' element={<AddAd />}></Route>
				<Route path='api/edit/:id' element={<EditAdForm />}></Route>
				<Route path='login' element={<LoginForm />}></Route>
				<Route path='register' element={<RegisterForm />}></Route>
			</Routes>
		</Container>
	)
}

export default App
