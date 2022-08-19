import './App.scss'
import { useEffect, memo, Fragment } from 'react'
import { publicRoutes as routes } from '@/routes'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import { useDispatch, useSelector } from 'react-redux'
import { getGenres } from '@/store/genresSlice'
import { genresSelector } from '@/store/selectors'

function App() {
    const dispatch = useDispatch()
    const genres = useSelector(genresSelector)

    // get genre list
    useEffect(() => {
        if (Object.keys(genres).length > 0) return

        dispatch(getGenres())
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <Router>
                <div className="app">
                    <Routes>
                        {routes.map((route, idx) => {
                            let Element = route.component

                            let Layout = MainLayout
                            if (route.layout === null) Layout = Fragment
                            else if (route.layout) Layout = route.layout
                            return (
                                <Route
                                    key={idx}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Element />
                                        </Layout>
                                    }
                                />
                            )
                        })}
                    </Routes>
                </div>
            </Router>
        </>
    )
}

export default memo(App)
