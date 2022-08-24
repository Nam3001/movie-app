import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		logged: Boolean(localStorage.getItem('access_token')),
		userInfo: JSON.parse(localStorage.getItem('user_info')) || {}
	},
	reducers: {
		signIn: (state, action) => {
			localStorage.setItem('access_token', action.payload.accessToken)
			localStorage.setItem('user_info', JSON.stringify(action.payload))

			state.logged = true
			state.userInfo = JSON.parse(JSON.stringify(action.payload))
		},
		signOut: (state) => {
			localStorage.removeItem('access_token')
			localStorage.removeItem('user_info')

			state.logged = false
			state.userInfo = {}
		}
	}
})

export const { signIn, signOut } = authSlice.actions
export default authSlice.reducer
