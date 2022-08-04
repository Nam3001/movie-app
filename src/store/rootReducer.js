import { combineReducers } from '@reduxjs/toolkit'
import genresReducer from './genresSlice'

const rootReducer = combineReducers({
	genres: genresReducer
})

export default rootReducer