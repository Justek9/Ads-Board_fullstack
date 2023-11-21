import React, { useEffect, useState } from 'react'
import { Alert, Spinner } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import { API_URL } from '../../config'
import AdSummary from '../features/AdSummary'

const SearchPage = () => {
	const { searchPhrase } = useParams()
	const [status, setStatus] = useState(null)
	const [adsToShow, setAdsToShow] = useState([])

	useEffect(() => {
		setStatus('loading')

		const options = {
			method: 'GET',
		}
		fetch(`${API_URL}/ads/search/${searchPhrase}`, options)
			.then(res => {
				if (res.status !== 200) {
					setStatus('serverError')
				} else {
					setStatus('')
					return res.json()
				}
			})
			.then(ads => setAdsToShow(ads))
			.catch(() => setStatus('serverError'))
	}, [searchPhrase])
	if (adsToShow.length === 0) return <p>Nothing matches your search....</p>

	return (
		<div className={'container'}>
			<h1>Search phrase: &quot;{searchPhrase}&quot;</h1>
			{status === 'loading' && (
				<Spinner animation='border' role='status'>
					<span className='visually-hidden'>Loading...</span>
				</Spinner>
			)}

			{status === 'serverError' && (
				<Alert variant='danger'>
					<Alert.Heading>Something went wrong...</Alert.Heading>
					<p>Unexpected error...Try again!.</p>
				</Alert>
			)}

			<div className='d-flex justify-content-start flex-wrap mt-4'>
				{adsToShow.map((ad, i) => (
					<AdSummary key={i} ad={ad}></AdSummary>
				))}
			</div>
		</div>
	)
}
export default SearchPage
