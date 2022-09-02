import { db } from '@/services/firebaseConfig'
import { doc, getDoc, setDoc } from 'firebase/firestore'

// Add movie method
export const handleAddMovie = async ({
	isBookmarked,
	loading,
	setLoading,
	setIsBookmarked,
	handleCloseModal,
	userId,
	movieInfo,
	showToast,
	saveOption
}) => {
	if (isBookmarked) return
	try {
		if (!loading) setLoading(true)

		// create document ref firebase
		const docRef = doc(db, 'bookmarks', userId)

		// movie data to add
		const movieData = {
			movieInfo,
			category: saveOption.value,
			created_at: Date.now()
		}
		// get document snap
		const docSnap = await getDoc(docRef)

		// detect whether document snap have any movie or not
		// to create movie data to update
		const collectionData = docSnap.data()?.movies
			? {
					movies: [...docSnap.data()?.movies, movieData],
					movieIds: [...docSnap.data()?.movieIds, movieInfo?.id]
			  }
			: {
					movies: [movieData],
					movieIds: [movieInfo?.id]
			  }
		// add movie and notify
		await setDoc(docRef, collectionData)
		showToast('Đã lưu!', {
			variant: 'success',
			autoHideDuration: 3000
		})
		setIsBookmarked(true)
		handleCloseModal()
	} catch (error) {
		console.log(error.message)
		showToast('Đã xảy ra lỗi!', {
			variant: 'error',
			autoHideDuration: 3000
		})
	} finally {
		setLoading(false)
	}
}

// Update movie method
export const handleUpdateMovie = async ({
	isBookmarked,
	loading,
	setLoading,
	setIsBookmarked,
	handleCloseModal,
	userId,
	movieInfo,
	showToast,
	saveOption
}) => {
	if (!isBookmarked) return
	try {
		if (!loading) setLoading(true)

		// create document ref
		const docRef = doc(db, 'bookmarks', userId)

		// movie data to update
		const movieData = {
			movieInfo,
			category: saveOption.value,
			created_at: Date.now()
		}

		// get movies from firebase
		const docSnap = await getDoc(docRef)
		const docMovies = docSnap.data()?.movies

		// update movie
		const updateMovies = () => {
			const result = docMovies.filter(
				(movie) => movie.movieInfo.id !== movieInfo.id
			)

			result.push(movieData)
			return result
		}
		const updatedMovies = updateMovies()

		const newData = {
			movies: [...updatedMovies],
			movieIds: [...docSnap.data()?.movieIds]
		}

		await setDoc(docRef, newData)
		showToast('Đã cập nhật!', {
			variant: 'success',
			autoHideDuration: 3000
		})
		handleCloseModal()
	} catch (error) {
		console.log(error.message)
		showToast('Đã xảy ra lỗi!', {
			variant: 'error',
			autoHideDuration: 3000
		})
	} finally {
		setLoading(false)
	}
}

// Remove movie method
export const handleRemoveMovie = async ({
	isBookmarked,
	loading,
	setLoading,
	setIsBookmarked,
	handleCloseModal,
	userId,
	movieInfo,
	showToast,
	saveOption
}) => {
	if (!isBookmarked) return
	try {
		if (!loading) setLoading(true)

		// create document ref
		const docRef = doc(db, 'bookmarks', userId)

		// get movies from firebase
		const docSnap = await getDoc(docRef)
		
		const docMovies = docSnap.data()?.movies
		const docMovieIds = docSnap.data()?.movieIds

		const removedMovies = docMovies.filter(
			(movie) => movie.movieInfo.id !== movieInfo.id
		)
		const removedMovieIds = docMovieIds.filter(
			(movieId) => movieId !== movieInfo.id
		)

		const newData = {
			movies: [...removedMovies],
			movieIds: [...removedMovieIds]
		}

		// remove movie on firestore
		await setDoc(docRef, newData)
		showToast('Đã bỏ theo dõi!', {
			variant: 'success',
			autoHideDuration: 3000
		})
		setIsBookmarked(false)
		handleCloseModal()
	} catch (error) {
		console.log(error.message)
		showToast('Đã xảy ra lỗi!', {
			variant: 'error',
			autoHideDuration: 3000
		})
	} finally {
		setLoading(false)
	}
}
