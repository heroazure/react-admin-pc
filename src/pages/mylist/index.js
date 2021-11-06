import React, {useEffect} from "react"
import {observer} from "mobx-react-lite"
import Table from '../table'
import store, {tableStore} from './store'
import columns from './columns'
import SearchBar from '@/components/SearchBar'
import moment from 'moment'
import momentZone from 'moment-timezone'
import { DatePicker, Select, Button } from 'antd'
const { Option } = Select
const { Item } = SearchBar


export default observer(() => {
    useEffect(() => {
        momentZone.tz.add([
            'Asia/Riyadh|LMT +03|-36.Q -30|01|-TvD6.Q|57e5',
            'America/Mexico_City|LMT MST CST CDT CWT|6A.A 70 60 50 50|012121232324232323232323232323232323232323232323232323232323232323232323232323232323232323232323232|-1UQF0 deL0 8lc0 17c0 10M0 1dd0 gEn0 TX0 3xd0 Jb0 6zB0 SL0 e5d0 17b0 1Pff0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 1fB0 WL0 1fB0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0 14p0 1nX0 11B0 1nX0 11B0 1nX0 11B0 1nX0 14p0 1lb0 14p0 1lb0|20e6',
            'Mexico/Mexico City|PST PDT|80 70|0101|1Lzm0 1zb0 Op0'])
        const Los_Angeles = momentZone().tz('America/Los_Angeles').format('YYYY-MM-DD hh:mm:ss')
        const Riyadh = momentZone().tz('Asia/Riyadh').format('YYYY-MM-DD hh:mm:ss')
        const Rabat = momentZone().tz('Morocco/Rabat').format('YYYY-MM-DD hh:mm:ss')
        const Mexico = momentZone().tz('America/Mexico_City').format('YYYY-MM-DD hh:mm:ss')
        console.log('Los_Angeles:', Los_Angeles)
        console.log('Riyadh:', Riyadh)
        console.log('Rabat:', Rabat)
        console.log('Mexico:', Mexico)
        window.momentZone = momentZone
        console.log(momentZone.tz.add)
    }, [])
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
        </>
    )
})
