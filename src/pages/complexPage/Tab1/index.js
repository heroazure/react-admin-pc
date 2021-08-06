import React from 'react'
import {Input, Button, message} from "antd"
import {useLocalObservable, observer} from "mobx-react-lite"
import loginStore from '../../login/store'

export default observer(() => {
    const {userAuth: {user}} = loginStore
    const store = useLocalObservable(() => ({
        username: user,
        setUsername (e) {
            this.username = e.target.value
        },
        onEdit () {
            loginStore.setUserAuth({
                user: this.username,
                isAuthenticated: true
            })
            message.success('修改成功')
        }
    }))
    return (
        <>
            <h3>我是Tab1,修改全局用户名</h3>
            <p>{process.env.REACT_APP_URL}</p>
            <Input style={{width: 200}} value={store.username} onChange={store.setUsername} />
            <Button type='primary' onClick={store.onEdit}>修改</Button>
        </>
    )
})
