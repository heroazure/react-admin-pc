import React, {useEffect, lazy} from 'react'
import { Table } from 'antd'
import {observer} from "mobx-react-lite"
import store from "./store"
import columns from "./columns"
const DetailModal = lazy(() => import("../DetailModal"))

export default observer(() => {
    const {data} = store
    useEffect(() => {
        store.getList()
    }, [])
    return (
        <>
            <h3>我是Tab2</h3>
            <Table columns={columns} dataSource={data} />
            <DetailModal />
        </>
    )
})
