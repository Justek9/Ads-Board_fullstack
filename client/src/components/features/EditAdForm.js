import AdForm from '../common/AdForm'
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import { getAdbyId } from '../../redux/adsRedux'
import { useSelector } from 'react-redux'

const EditAdForm = () => {
	const { id } = useParams()
	const ad = useSelector(state => getAdbyId(state, id))[0]
	// const navigate = useNavigate()

	if (!ad) return <Navigate to='/' />

	return (
		<AdForm
			actionText={'Edit'}
			title={ad.title}
			text={ad.text}
			price={ad.price}
			location={ad.location}
			image={ad.src}
		/>
	)
}

export default EditAdForm
