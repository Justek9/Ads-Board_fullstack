import { useParams, Navigate } from 'react-router-dom'
import { getAdbyId } from '../../redux/adsRedux'
import { useSelector } from 'react-redux'
import AddAndEditForm from './AdAndEditForm'

const EditAdForm = () => {
	const { id } = useParams()
	const ad = useSelector(state => getAdbyId(state, id))[0]

	if (!ad) return <Navigate to='/' />

	return (
		<AddAndEditForm
			action={'Edit'}
			title={ad.title}
			text={ad.text}
			price={ad.price}
			location={ad.location}
			id={ad._id}
			user={ad.user}
		/>
	)
}

export default EditAdForm
