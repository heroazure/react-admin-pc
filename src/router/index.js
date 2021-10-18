import React, { Suspense, lazy } from 'react'
import { Spin } from 'antd'
import {
    Switch,
    Route
} from "react-router-dom"
const Home = lazy(() => import("../pages/home"))
const NotFound = lazy(() => import("../pages/notfound"))

export default function RouterView() {
    return (
        <Suspense fallback={<Spin />}>
            <Switch>
                <Route exact path="/">
                    <Home/>
                </Route>
                <Route path="*">
                    <NotFound/>
                </Route>
            </Switch>
        </Suspense>
    )
}
