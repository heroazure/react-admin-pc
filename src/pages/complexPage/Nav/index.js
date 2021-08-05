import React from 'react'
import {Link, useRouteMatch} from "react-router-dom"
import tab2Store from '../Tab2/store'
import './style.css'

export default function Nav() {
    const match = useRouteMatch()
    return (
        <ul className='nav'>
            <li>
                <Link to={`${match.url}`}>栏目1</Link>
            </li>
            <li>
                <Link to={`${match.url}/tab2`}>
                    栏目2({tab2Store.total})
                </Link>
            </li>
        </ul>
    )
}
