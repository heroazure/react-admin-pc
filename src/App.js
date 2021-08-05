// @flow
import React from "react"
import Layout from './layout'
import RouterView from './router'
import Login from './pages/login'
import { useLocation } from 'react-router-dom'

export default function App() {
    const {pathname} = useLocation()
    return pathname === '/login' ? <Login/> :
        <Layout>
            <RouterView/>
        </Layout>
}
