import React, {useState, useEffect} from "react"
import {Link, useLocation} from "react-router-dom"
import {Layout, Menu} from 'antd'
import {
    UserOutlined,
    UploadOutlined,
} from '@ant-design/icons'
import style from './style.module.scss'
import {observer} from "mobx-react-lite";
import store from "./store";
import Header from './header'

const {Sider, Content} = Layout

const menus = [
    {key: '1', path: '/', name: 'Home', icon: <UserOutlined/>},
    {key: '2', path: '/complexPage', name: '复杂页面示例', icon: <UploadOutlined/>},
    {key: '3', path: '/mylist', name: '表格示例', icon: <UploadOutlined/>}
]

export default observer((props) => {
        const {collapsed} = store
        const {children} = props
        const [selectedKeys, setSelectedKeys] = useState([])
        const {pathname} = useLocation()
        useEffect(() => {
            const key = menus.find(item => item.path === pathname)?.key
            console.log('key:', key)
            setSelectedKeys([key])
        }, [pathname])
        return (
            <Layout className={style.body}>
                <Sider trigger={null} collapsible collapsed={collapsed}>
                    <div className={style.logo}/>
                    <Menu theme="dark" mode="inline" selectedKeys={selectedKeys}>
                        {
                            menus.map(item =>
                                <Menu.Item key={item.key} icon={item.icon}>
                                    <Link to={item.path}>{item.name}</Link>
                                </Menu.Item>
                            )
                        }
                    </Menu>
                </Sider>
                <Layout>
                    <Header />
                    <Content
                        className={style.bodyContent}
                        style={{
                            margin: '24px 16px',
                            padding: 24
                        }}
                    >
                        {children}
                    </Content>
                </Layout>
            </Layout>
        )
    }
)
