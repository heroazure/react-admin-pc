import React, {useEffect, useState} from "react"
import {observer} from "mobx-react-lite"
import Table from '@/components/Table'
import store, {tableStore} from './store'
import columns from './columns'
import SearchBar from '@/components/SearchBar'
import moment from 'moment'
import Skeleton from '@ant-design/pro-skeleton'
import { DatePicker, Select, Button } from 'antd'
import {useMount, useMouse} from 'ahooks'
const { Option } = Select
const { Item } = SearchBar

export default observer(() => {
    useMount(() => {
        console.log('useMount...')
    })
    useEffect(() => {
        console.log('useEffect...')
    }, [])

    const [count, setCount] = useState(0)

    let testCount = count
    let testCount2 = count
    const state = useMouse()
    const onClick = () => {
        setCount(Math.random())
    }
    useEffect(() => {
        console.log('testCount2:', testCount2)
    }, [testCount2])
    useEffect(() => {
        console.log('testCount:', testCount)
    }, [testCount])
    useEffect(() => {
        // console.log('useEffect state:', state)
    }, [state])
    return (
        <>
            <p>uuid: {tableStore.$extraData.uuid}</p>
            <p>PUBLIC_URL: {process.env.PUBLIC_URL}</p>
            <SearchBar
                store={tableStore}
                triggerSearchItems={['date', 'status']}
                initialValues={{ status: '', date: moment().subtract(1, 'day') }}
            >
                <Item label="日期" name="date">
                    <DatePicker style={{ width: 200 }} />
                </Item>
                <Item label="计划状态" name="status">
                    <Select style={{ width: 200 }}>
                        <Option value="">全部</Option>
                        <Option value="0">待预约</Option>
                        <Option value="1">已预约</Option>
                        <Option value="2">已签到</Option>
                        <Option value="3">已签退</Option>
                    </Select>
                </Item>
            </SearchBar>
            <Table store={tableStore} columns={columns} rowKey={'key'} />
            <Button onClick={onClick}>测试</Button>
            {tableStore.$loading && <Skeleton type="result" />}
        </>
    )
})
