import React from "react";
import {observer} from "mobx-react-lite";
import style from "./style.module.scss";
import {MenuFoldOutlined, MenuUnfoldOutlined} from "@ant-design/icons";
import loginStore from "../pages/login/store";
import store from "./store";
import {Layout, Button, Row, Col} from "antd"
import {useHistory} from "react-router-dom";
const {Header} = Layout

export default observer(() => {
    const {collapsed, toggle, } = store
    const {userAuth, signOut} = loginStore
    let history = useHistory()
    const loginOut = () => {
        signOut(() => {
            history.replace('/login')
        })
    }
    return <Header className={style.bodyHeader} style={{padding: '0 16px 0 0'}}>
        <Row justify='space-between'>
            <Col>
                {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: style.trigger,
                    onClick: toggle,
                })}
            </Col>
            <Col>
                {userAuth.user}&nbsp;&nbsp;
                <Button type='primary' size='small' onClick={loginOut}>退出</Button>
            </Col>
        </Row>
    </Header>
})
