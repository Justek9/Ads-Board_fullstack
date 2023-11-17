import AdForm from '../common/AdForm'
import { useParams, useNavigate, Navigate } from 'react-router-dom'
import { editAdRequest, getAdbyId } from '../../redux/adsRedux'
import { useDispatch, useSelector } from 'react-redux'

const EditAdForm = () => {
	const { id } = useParams()
	const ad = useSelector(state => getAdbyId(state, id))[0]
	const navigate = useNavigate()
	const dispatch = useDispatch()

	const handleSubmit = (ad, event) => {
		dispatch(editAdRequest(ad))
		navigate('/')
	}

	if (!ad) return <Navigate to='/' />

	return (
		<AdForm
			action={handleSubmit}
			actionText={'Edit'}
			title={ad.title}
			text={ad.text}
			price={ad.price}
			location={ad.location}
			image={ad.src}
			id={ad._id}
		/>
	)
}

export default EditAdForm
