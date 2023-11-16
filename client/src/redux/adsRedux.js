import { API_URL } from '../config'

// selectors
export const getAllAds = ({ ads }) => {
	return ads
}

export const getAdbyId = ({ ads }, id) => {
	return ads.filter(ad => ad._id === id)
}

// actions
const createActionName = actionName => `api/ads/${actionName}`
const LOAD_ADS = createActionName('LOAD_ADS')
const DELETE_AD = createActionName('DELETE_AD')

// action creators
export const loadAds = payload => ({ type: LOAD_ADS, payload })
export const deleteAd = payload => ({ type: DELETE_AD, payload })

export const deleteAdRequest = id => {
	return dispatch => {
		console.log(`${API_URL}/ads/${id}`)
		const options = {
			method: 'DELETE',
		}
		fetch(`${API_URL}/ads/${id}`, options)
			.then(() => {
				dispatch(deleteAd(id))
			})

			.catch(error => {
				console.error(error)
			})
	}
}
export const fetchAds = () => {
	return dispatch => {
		fetch(`${API_URL}/ads`)
			.then(res => {
				return res.json()
			})
			.then(ads => {
				dispatch(loadAds(ads))
			})
			.catch(error => {
				console.error(error)
			})
	}
}

const adsReducer = (statePart = [], action) => {
	switch (action.type) {
		case LOAD_ADS:
			return [...action.payload]
		case DELETE_AD:
			console.log('delete:', action.payload)
			return statePart.filter(ad => ad._id !== action.payload)

		default:
			return statePart
	}
}

export default adsReducer
