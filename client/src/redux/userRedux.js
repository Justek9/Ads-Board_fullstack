// selectors

// actions
const createActionName = actionName => `api/ads/${actionName}`
const LOG_IN = createActionName('LOG_IN')

// action creators

export const loginUser = payload => ({
	type: LOG_IN,
	payload,
})

const userReducer = (statePart = [], action) => {
	switch (action.type) {
		case LOG_IN:
			console.log(action.payload)
			return action.payload
		default:
			return statePart
	}
}

export default userReducer
