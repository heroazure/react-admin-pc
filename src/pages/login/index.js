import React from "react"
import {useHistory, useLocation} from "react-router-dom"
import store from "./store"
import {Card, Input, Button, Space} from 'antd'
import {UserOutlined} from '@ant-design/icons'
import './style.css'
import {observer} from 'mobx-react-lite'

export default observer((props) => {
    let history = useHistory();
    let location = useLocation();

    let {from} = location.state || {from: {pathname: "/"}}
    const login = () => {
        store.signIn(() => {
            history.replace(from)
        })
    };
    const {username, password, onChangeVal} = store
    return (
        <div className='login-card-bg'>
            <Card className='login-card' hoverable>
                <Space direction="vertical" style={{width: '100%'}}>
                    <Input
                        size="large"
                        value={username} onChange={(e) => onChangeVal('username', e)}
                        placeholder="用户名"
                        prefix={<UserOutlined/>}
                    />
                    <Input.Password
                        size="large"
                        value={password}
                        onChange={(val) => onChangeVal('password', val)}
                        placeholder="密码"
                        prefix={<UserOutlined/>}
                    />
                    {/*<p>{store.userAuth.user}你需要登陆，然后进入该页：{from.pathname}</p>*/}
                    {/*<button onClick={login}>登陆</button>*/}
                    <Button type="primary" size="large" onClick={login} block>登录</Button>
                </Space>
            </Card>
        </div>
    )
})
