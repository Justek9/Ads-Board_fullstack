import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Search.module.scss'

const SearchBar = () => {
	const [searchPhrase, setSearchPhrase] = useState('')
	const navigate = useNavigate()

	const handleSubmit = e => {
		e.preventDefault()
		navigate(`/search/${searchPhrase}`)
	}

	return (
		<form className={styles.searchContainer} onSubmit={handleSubmit}>
			<input
				type='search'
				className={styles.search}
				placeholder='Search...'
				value={searchPhrase}
				onChange={e => setSearchPhrase(e.target.value)}></input>
		</form>
	)
}

export default SearchBar
