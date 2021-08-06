import React, { Suspense, lazy } from 'react'
import { Spin } from 'antd'
import {
    Switch,
    Route
} from "react-router-dom"
import PrivateRoute from '../pages/login/privateRoute'
const Home = lazy(() => import("../pages/home"))
const ComplexPage = lazy(() => import("../pages/complexPage"))
const MyList = lazy(() => import("../pages/mylist"))

const NotFound = lazy(() => import("../pages/notfound"))

export default function RouterView() {
    return (
        <Suspense fallback={<Spin />}>
            <Switch>
                <PrivateRoute exact path="/">
                    <Home/>
                </PrivateRoute>
                <PrivateRoute path="/complexPage">
                    <ComplexPage/>
                </PrivateRoute>
                <PrivateRoute path="/mylist">
                    <MyList/>
                </PrivateRoute>
                <Route path="*">
                    <NotFound/>
                </Route>
            </Switch>
        </Suspense>
    )
}
