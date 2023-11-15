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

// action creators
export const loadAds = payload => ({ type: LOAD_ADS, payload })

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
			console.log([...action.payload])
			return [...action.payload]

		default:
			return statePart
	}
}

export default adsReducer
