import { memo, useCallback, useEffect, useState, useRef } from 'react'
import clsx from 'clsx'
import { Box, Typography, Fab } from '@mui/material'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import { connect } from 'react-redux'
import AppsIcon from '@mui/icons-material/Apps'
import ViewListIcon from '@mui/icons-material/ViewList'
import { useLocation, useNavigate } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import queryString from 'query-string'

import { db } from '@/services/firebaseConfig'
import MovieListGrid from '@/components/MovieListGrid'
import MovieList from '@/components/MovieList'
import ScrollTop from '@/components/ScrollTop'
import { createPathname } from '@/utils/common'
import config from '@/configs'

const styles = {
	wrapper: {
		p: '16px'
	},
	heading: {
		color: (theme) => theme.color.heading,
		fontSize: '30px',
		fontWeight: 500,
		ml: 2,
		mt: 2,
		textAlign: {
			xs: 'center',
			sm: 'left'
		}
	},
	tab: {
		textDecoration: 'none',
		color: (theme) => theme.color.nav,
		fontSize: '16px',
		fontWeight: 500,
		p: 1,
		mx: 1,
		display: 'inline-block',
		borderRadius: '5px',
		whiteSpace: 'nowrap',
		cursor: 'pointer',
		'&.active': {
			backgroundColor: (theme) => theme.color.primary.main
		}
	},
	tabs: {
		display: 'flex',
		flexFlow: 'row nowrap',
		overflow: 'auto',
		mt: 3,
		borderRadius: '5px',
		width: '456px',
		maxWidth: '100%',
		backgroundColor: (theme) => theme.color.primary.light,
		mx: {
			xs: 'auto',
			sm: '16px'
		},
		py: 1.2,
		'&::-webkit-scrollbar': {
			display: 'none'
		}
	},
	empty: {
		color: (theme) => theme.color.nav,
		textAlign: 'center'
	},
	displayModeContainer: {
		width: '100%',
		display: 'flex',
		justifyContent: 'flex-end',
		mt: {
			xs: 2,
			sm: 0
		},
		'& svg': {
			color: (theme) => theme.color.nav,
			fontSize: '30px'
		}
	},
	displayMode: {
		display: 'flex',
		alignItems: 'center',
		borderRadius: '3px',
		cursor: 'pointer',
		padding: '3px',
		'&.active': {
			backgroundColor: (theme) => theme.color.primary.light
		}
	}
}

const Follow = (props) => {
	const location = useLocation()
	const navigate = useNavigate()

	const userId = props.userInfo.uid
	const status = queryString.parse(location.search)?.status
	const statusList = useRef(config.bookmarkOptions).current

	// state
	const [loading, setLoading] = useState(true)
	const [movieInfoList, setMovieInfoList] = useState([])
	const [movies, setMovies] = useState([])
	// gridMode -> show grid, !gridMode -> show list
	const [gridMode, setGridMode] = useState(true)

	useEffect(() => {
		;(async () => {
			if (!userId) return

			try {
				const docRef = doc(db, 'bookmarks', userId)
				const docSnap = (await getDoc(docRef)).data()

				setMovies(docSnap.movies)
				setLoading(false)
			} catch (error) {
				console.log(error)
			}
		})()
	}, [userId])

	const filterMovies = useCallback(
		(movies, status) => {
			return movies
				.filter((movie) => movie.category === status)
				.map((movie) => movie.movieInfo)
		},
		// eslint-disable-next-line
		[movies]
	)

	useEffect(() => {
		;(async () => {
			if (!userId) return

			try {
				if (!loading) setLoading(true)

				// get data firebase
				const docRef = doc(db, 'bookmarks', userId)
				const docSnap = await getDoc(docRef)

				const movies = docSnap.data()?.movies
				if (!movies) return

				// fiter movies
				if (!status) {
					// default status is watching
					const filteredMovies = filterMovies(movies, 'watching')
					setMovieInfoList(filteredMovies)
				} else {
					const filteredMovies = filterMovies(movies, status)
					setMovieInfoList(filteredMovies)
				}
			} catch (error) {
				console.log(error)
			} finally {
				setLoading(false)
			}
		})()
		// eslint-disable-next-line
	}, [location.search, userId])

	const handleClickStatus = useCallback(
		(status) => {
			const pathname = location.pathname
			const queryParams = queryString.parse(location.search)
			const newQuery = {
				...queryParams,
				status
			}

			navigate(
				{
					pathname,
					search: queryString.stringify(newQuery)
				},
				{ replace: true }
			)
		},
		[location.search]
	)

	const switchGridMode = useCallback(() => {
		setGridMode(true)
	}, [])
	const switchListMode = useCallback(() => {
		setGridMode(false)
	}, [])

	const setActiveClassName = useCallback(
		(value) => {
			if (status) {
				return status === value
			} else {
				return value === 'watching'
			}
		},
		[status]
	)

	const handleClickMovie = useCallback((id) => {
		if (!id) return

		const pathname = createPathname(config.routes.movieDetail, id)
		navigate(pathname)
		// eslint-disable-next-line
	}, [])

	return (
		<Box sx={styles.wrapper}>
			<Typography sx={styles.heading}>Danh Sách Theo Dõi</Typography>
			<Box sx={styles.tabs}>
				{statusList.map((statusItem, idx) => (
					<Box
						key={idx}
						className={clsx({
							active: setActiveClassName(statusItem.value)
						})}
						onClick={() => handleClickStatus(statusItem.value)}
						sx={styles.tab}
					>
						{statusItem.label}
					</Box>
				))}
			</Box>

			<Box sx={styles.displayModeContainer}>
				<Box
					sx={styles.displayMode}
					onClick={switchGridMode}
					className={clsx({ active: gridMode })}
				>
					<AppsIcon />
				</Box>
				<Box
					sx={styles.displayMode}
					onClick={switchListMode}
					className={clsx({ active: !gridMode })}
				>
					<ViewListIcon />
				</Box>
			</Box>

			{/* grid mode*/}
			{gridMode && (
				<MovieListGrid
					movies={movieInfoList}
					isLoading={loading}
					pagination={false}
				/>
			)}

			{/* list mode */}
			{!gridMode && (
				<MovieList
					movies={movieInfoList}
					loading={loading}
					onClick={handleClickMovie}
				/>
			)}

			{movieInfoList.length === 0 && !loading && (
				<Typography sx={styles.empty}>
					Chưa theo dõi phim nào!
				</Typography>
			)}

			<ScrollTop>
				<Fab size="small" aria-label="scroll back to top">
					<KeyboardArrowUpIcon />
				</Fab>
			</ScrollTop>
		</Box>
	)
}

Follow.propTypes = {}

const mapStateToProps = (state) => ({
	userInfo: state.authentication.userInfo
})

export default memo(connect(mapStateToProps)(Follow))
