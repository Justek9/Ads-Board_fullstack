// selectors
export const getIsError = ({ error }) => {
	return error
}

// actions
const createActionName = actionName => `app/error/${actionName}`
const SET_ERROR = createActionName('SET_ERROR')

// action creators
export const setError = payload => ({ type: SET_ERROR, payload })

// reducer
const errorReducer = (statePart = false, action) => {
	switch (action.type) {
		case SET_ERROR:
			return action.payload
		default:
			return statePart
	}
}

export default errorReducer