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
const Transition = lazy(() => import("../pages/transition"))
const Drag = lazy(() => import("../pages/drag"))
const SwiperPage = lazy(() => import("../pages/swiper"))

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
                <PrivateRoute path="/transition">
                    <Transition/>
                </PrivateRoute>
                <PrivateRoute path="/drag">
                    <Drag/>
                </PrivateRoute>
                <PrivateRoute path="/swiper">
                    <SwiperPage/>
                </PrivateRoute>
                <Route path="*">
                    <NotFound/>
                </Route>
            </Switch>
        </Suspense>
    )
}
