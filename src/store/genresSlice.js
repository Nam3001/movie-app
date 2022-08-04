import { createReducer, createAsyncThunk } from '@reduxjs/toolkit'
import movieApi from '@/utils/api/movieApi'

export const getGenres = createAsyncThunk('genre/fetchGenre', async () => {
	const res = await movieApi.getGenres()
	const data = res.data.genres

	const result = data.reduce((agg, cur) => {
		agg[cur?.id] = cur?.name
		return agg
	}, {})
	return result
})

const initState = {}

const genresReducer = createReducer(initState, (builder) => {
	builder.addCase(getGenres.fulfilled, (state, action) => {
		Object.assign(state, action?.payload)
	})
})

export default genresReducer
