import React from "react"
import {
    Route,
    Redirect
} from "react-router-dom"
import store from "./store"
import {observer} from "mobx-react-lite";

export default observer(({ children, ...rest }) => {
    const {userAuth} = store
    return (
        <Route
            {...rest}
            render={({ location }) =>
                userAuth.isAuthenticated ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    )
})
