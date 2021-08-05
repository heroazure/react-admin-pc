import React from "react"
import { useLocation } from 'react-router-dom'
export default function NotFound () {
    const location = useLocation()
    return <div>
        <h2>404 not found</h2>
        <code>{location.pathname}</code>
    </div>
}
