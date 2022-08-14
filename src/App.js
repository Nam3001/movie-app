import './App.scss'
import { useEffect, memo, Fragment } from 'react'
import Test from '@/Test'
import { Typography } from '@mui/material'
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

                            let ChildRoute = null
                            if (
                                route.children &&
                                Array.isArray(route.children)
                            ) {
                                {ChildRoute = route.children.map(
                                    (childRoute, idx) => {
                                        const El = childRoute?.component
                                        return (
                                            <Route
                                                key={idx}
                                                path={childRoute.path}
                                                element={<El />}
                                            />
                                        )
                                    }
                                )}
                            }

                            return (
                                <Route
                                    key={idx}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Element />
                                        </Layout>
                                    }
                                >
                                    {route.children && ChildRoute}
                                </Route>
                            )
                        })}
                    </Routes>
                </div>
            </Router>
        </>
    )
}

export default App
