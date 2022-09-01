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

			state.logged = true
			state.userInfo = JSON.parse(JSON.stringify(action.payload))
		},
		signOut: (state) => {
			localStorage.removeItem('access_token')

			state.logged = false
			state.userInfo = {}
		},
		updateAvatar: (state, action) => {
			state.userInfo.photoURL = action.payload
		}
	}
})

export const { signIn, signOut, updateAvatar } = authSlice.actions
export default authSlice.reducer
