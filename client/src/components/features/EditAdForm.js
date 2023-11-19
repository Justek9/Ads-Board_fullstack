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
	
		// console.log(ad);
		// const fd = new FormData()
		// fd.append('title', ad.title)
		// fd.append('text', ad.text)
		// fd.append('price', ad.price)
		// fd.append('location', ad.location)
		// fd.append('src', ad.src)
		// fd.append('id', ad.id)
		// fd.append('date', ad.date)
		// fd.append('user', ad.user)

		// console.log(fd);




		// dispatch(editAdRequest(fd))
		// navigate('/')
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
