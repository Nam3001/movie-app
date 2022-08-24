import { combineReducers } from '@reduxjs/toolkit'
import genresReducer from './genresSlice'
import authReducer from './authSlice'

const rootReducer = combineReducers({
	genres: genresReducer,
	authentication: authReducer
})

export default rootReducer