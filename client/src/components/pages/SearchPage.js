import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { API_URL } from '../../config'
import { getAllAds } from '../../redux/adsRedux'
import AdSummary from '../features/AdSummary'

const SearchPage = () => {
	const { searchPhrase } = useParams()
	const [status, setStatus] = useState(null)
	const [adsToShow, setAdsToShow] = useState(null)

	useEffect(() => {
		setStatus('loading')

		const options = {
			method: 'GET',
		}
		fetch(`${API_URL}/ads/search/${searchPhrase}`, options)
			.then(res => {
				if (res.status === 201) {
					setStatus('success')
				} else if (res.status === 400) {
					setStatus('clientError')
				} else if (res.status === 409) {
					setStatus('loginError')
				} else {
					setStatus('serverError')
				}
				return res.json()
			})
			.then(ads => setAdsToShow(ads))
			.catch(err => console.log(err))
	}, [searchPhrase])

	return (
		<div className={'container'}>
			<h1>Search phrase: &quot;{searchPhrase}&quot;</h1>
			{status === 'loading' && (
				<Spinner animation='border' role='status'>
					<span className='visually-hidden'>Loading...</span>
				</Spinner>
			)}
			{!adsToShow && <p>Nothing matches your search....</p>}

			{adsToShow && (
				<div>
					{adsToShow.map((ad, i) => (
						<AdSummary key={i} ad={ad}></AdSummary>
					))}
				</div>
			)}
		</div>
	)
}

export default SearchPage
