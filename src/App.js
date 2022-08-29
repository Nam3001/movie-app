import './App.scss'
import { useEffect, memo, Fragment, useState } from 'react'
import { publicRoutes, privateRoutes } from '@/routes'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import MainLayout from './layouts/MainLayout'
import { getGenres } from '@/store/genresSlice'
import { signIn } from '@/store/authSlice'
import {
    genresSelector,
    userInfoSelector,
    loggedSelector
} from '@/store/selectors'
import { db, auth } from '@/services/firebaseConfig'
import { onAuthStateChanged } from 'firebase/auth'

function App() {
    const dispatch = useDispatch()
    const genres = useSelector(genresSelector)
    const userInfo = useSelector(userInfoSelector)
    const logged = useSelector(loggedSelector)

    // INIT NEEDED GLOBAL STATE
    useEffect(() => {
        // Initial user infomation
        onAuthStateChanged(auth, (user) => {
            const hadUserInfo = Object.keys(userInfo) > 0
            if (user && logged && !hadUserInfo) {
                dispatch(signIn(user))
            } else return
        })

        // Get genres list
        if (Object.keys(genres).length > 0) return
        dispatch(getGenres())
        // eslint-disable-next-line
    }, [])

    return (
        <>
            <Router>
                <div className="app">
                    <Routes>
                        {/* public routes */}
                        {publicRoutes.map((route, idx) => {
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

                        {/* private routes */}
                        {logged &&
                            privateRoutes.map((route, idx) => {
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
