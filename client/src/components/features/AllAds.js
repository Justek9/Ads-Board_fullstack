import { getAllAds } from '../../redux/adsRedux'
import { useSelector } from 'react-redux'
import AdSummary from './AdSummary'

const AllAds = () => {
	const ads = useSelector(state => getAllAds(state))

	return (
		<>
			{ads.map((ad, i) => (
				<AdSummary key={i} ad={ad}></AdSummary>
			))}
		</>
	)
}

export default AllAds
