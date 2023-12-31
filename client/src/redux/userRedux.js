// selectors
export const getUser = ({ user }) => {
	return user
}

// actions
const createActionName = actionName => `app/users/${actionName}`
const LOG_IN = createActionName('LOG_IN')
const LOG_OUT = createActionName('LOG_OUT')

// action creators

export const loginUser = payload => ({
	type: LOG_IN,
	payload,
})

export const logOut = () => ({
	type: LOG_OUT,
})

const userReducer = (statePart = [], action) => {
	switch (action.type) {
		case LOG_IN:
			return action.payload
		case LOG_OUT:
			return null

		default:
			return statePart
	}
}

export default userReducer
