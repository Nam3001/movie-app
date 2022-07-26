import './App.scss'
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

{
    /* <svg
    stroke="currentColor"
    fill="#fff"
    strokeWidth="0"
    viewBox="0 0 24 24"
    className="h-8 w-8"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
>
    <path d="M12 2a5 5 0 1 0 5 5 5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"></path>
</svg> */
}
