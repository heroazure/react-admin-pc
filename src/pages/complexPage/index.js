import React from 'react'
import {
    Switch,
    Route,
    useRouteMatch
} from "react-router-dom"
import {observer} from "mobx-react-lite"
import Tab1 from './Tab1'
import Tab2 from './Tab2'
import Nav from './Nav'
import tab2Store from './Tab2/store'

export default observer(() => {
    let match = useRouteMatch()
    const {total} = tab2Store
    return (
        <div>
            <h2>这是一个复杂的页面示例，使用Mobx</h2>
            <p>栏目2总行数：{total}</p>
            <Nav />
            <Switch>
                <Route path={match.path} exact>
                    <Tab1 />
                </Route>
                <Route path={`${match.path}/tab2`}>
                    <Tab2 />
                </Route>
            </Switch>
        </div>
    )
})
