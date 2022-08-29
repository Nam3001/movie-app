import { doc, getDoc } from 'firebase/firestore'
import { db } from '@/services/firebaseConfig'

export default async function checkFollowedMovie(userId, movieId) {
	if (!userId || !movieId) return false

	try {
		const docRef = doc(db, 'bookmarks', userId)
		const docSnap = await getDoc(docRef, movieId)

		const ids = docSnap.data()?.movieIds
		const followedMovie = ids.includes()
		return followedMovie
	} catch (error) {
		console.log(error)
		return false
	}
}
