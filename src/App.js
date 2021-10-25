// @flow
import React from "react"
import RouterView from './router'
import {useHistory} from "react-router-dom"

export default function App() {
    window.$history = useHistory()
    return <RouterView/>
}
