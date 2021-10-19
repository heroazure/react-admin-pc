import React, {useEffect} from 'react'
import {observer} from "mobx-react-lite"
import store from "./store"
import './style.less'

export default observer(() => {
    useEffect(async () => {
        await store.getData()
    }, [])
    return (
        <div className='container'>
           我是首页
        </div>
    )
})
