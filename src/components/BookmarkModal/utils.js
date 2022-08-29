import { db } from '@/services/firebaseConfig'
import { doc, getDoc, setDoc } from 'firebase/firestore'

// Add movie method
export const handleAddMovie = async ({
	bookmarked,
	loading,
	setLoading,
	setIsBookmarked,
	handleCloseModal,
	userId,
	movieInfo,
	showToast,
	saveOption
}) => {
	if (bookmarked) return
	try {
		if (!loading) setLoading(true)
		const docRef = doc(db, 'bookmarks', userId)
		const movieData = {
			movieInfo,
			category: saveOption.value,
			created_at: Date.now()
		}
		const docSnap = await getDoc(docRef)
		const collectionData = docSnap.data()?.movies
			? {
					movies: [...docSnap.data()?.movies, movieData],
					movieIds: [...docSnap.data()?.movieIds, movieInfo?.id]
			  }
			: {
					movies: [movieData],
					movieIds: [movieInfo?.id]
			  }
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
	bookmarked,
	loading,
	setLoading,
	setIsBookmarked,
	handleCloseModal,
	userId,
	movieInfo,
	showToast,
	saveOption
}) => {
	if (!bookmarked) return
	try {
		if (!loading) setLoading(true)

		const docRef = doc(db, 'bookmarks', userId)
		const movieData = {
			movieInfo,
			category: saveOption.value,
			created_at: Date.now()
		}
		const docSnap = await getDoc(docRef)
		const docMovies = docSnap.data()?.movies

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
	bookmarked,
	loading,
	setLoading,
	setIsBookmarked,
	handleCloseModal,
	userId,
	movieInfo,
	showToast,
	saveOption
}) => {
	if (!bookmarked) return
	try {
		if (!loading) setLoading(true)

		const docRef = doc(db, 'bookmarks', userId)
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
