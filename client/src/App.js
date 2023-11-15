import { Container } from 'react-bootstrap'
import './App.css'
import Home from './components/pages/Home'
import NavBar from './components/views/NavBar'

const App = () => {
	return (
		<Container>
			<NavBar />
			<Home />
		</Container>
	)
}

export default App
