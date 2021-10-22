import React, { Suspense, lazy } from 'react'
import { Spin } from 'antd'
import {
    Switch,
    Route
} from "react-router-dom"
const BlindBox = lazy(() => import("../pages/blindbox"))
const Download = lazy(() => import("../pages/download"))
const NotFound = lazy(() => import("../pages/notfound"))

export default function RouterView() {
    return (
        <Suspense fallback={<Spin />}>
            <Switch>
                <Route exact path="/blindbox">
                    <BlindBox/>
                </Route>
                <Route path="/download/:language">
                    <Download/>
                </Route>
                <Route path="*">
                    <NotFound/>
                </Route>
            </Switch>
        </Suspense>
    )
}
