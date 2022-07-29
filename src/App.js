import './App.scss'
import { useEffect } from 'react'
import Test from '@/Test'
import { Fragment } from 'react'
import { Typography } from '@mui/material'
import { publicRoutes as routes } from '@/routes'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {routes.map((route, idx) => {
                        const Element = route.component

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
    )
}

export default App
