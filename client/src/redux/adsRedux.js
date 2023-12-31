import { API_URL } from '../config'
import { setError } from './errorRedux'
import { setLoading } from './isLoadingRedux'

// selectors
export const getAllAds = ({ ads }) => {
	return ads
}

export const getAdbyId = ({ ads }, id) => {
	return ads.filter(ad => ad._id === id)
}

// actions
const createActionName = actionName => `app/ads/${actionName}`
const LOAD_ADS = createActionName('LOAD_ADS')
const DELETE_AD = createActionName('DELETE_AD')
const EDIT_AD = createActionName('EDIT_AD')
const ADD_AD = createActionName('EDIT_AD')

// action creators
export const loadAds = payload => ({ type: LOAD_ADS, payload })
export const deleteAd = payload => ({ type: DELETE_AD, payload })
export const editAd = payload => ({ type: EDIT_AD, payload })
export const addAd = payload => ({ type: ADD_AD, payload })

export const deleteAdRequest = id => {
	return dispatch => {
		const options = {
			method: 'DELETE',
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
			credentials: 'include',
		}
		fetch(`${API_URL}/ads/${id}`, options)
			.then(res => {
				if (res.status === 200) {
					dispatch(deleteAd(id))
				}
			})
			.catch(error => {
				dispatch(setLoading(false))
				dispatch(setError(true))
			})
	}
}
export const fetchAds = () => {
	return dispatch => {
		dispatch(setLoading(true))
		fetch(`${API_URL}/ads`)
			.then(res => {
				return res.json()
			})
			.then(ads => {
				dispatch(setLoading(false))
				dispatch(loadAds(ads))
			})
			.catch(error => {
				dispatch(setLoading(false))
				dispatch(setError(true))
			})
	}
}

const adsReducer = (statePart = [], action) => {
	switch (action.type) {
		case LOAD_ADS:
			return [...action.payload]
		case DELETE_AD:
			return statePart.filter(ad => ad._id !== action.payload)
		case EDIT_AD:
			return statePart.map(ad => (ad._id === action.payload.id ? { ...ad, ...action.payload } : ad))
		case ADD_AD:
			return [...statePart, { ...action.payload }]

		default:
			return statePart
	}
}

export default adsReducer
