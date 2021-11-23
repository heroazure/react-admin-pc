import React, {useEffect} from "react"
import { toJS } from 'mobx'
import {observer} from "mobx-react-lite"
import {Table} from 'antd'

const getColumns = (columns) => {
    const _columns = []
    columns.forEach((item, i) => {
        const { hidden, ...rest } = item
        if (!(typeof hidden === 'function' ? hidden() : hidden)) {
            rest.key = (rest.dataIndex || 'COLUMN_KEY') + i
            _columns.push(rest)
        }
    })
    return _columns
}

const NOOP = () => {}
const defaultStore = {
    $list: [],
    $loading: false,
    $pagination: {
        showQuickJumper: true,
        showTotal: (total) => `共 ${total} 条`,
        showSizeChanger: true,
        current: 1,
        pageSize: 10,
        total: 0,
    },
    $getList: NOOP,
    $paging: NOOP,
    $selectedRowKeys: [],
    $onSelectChange: NOOP,
}

export default observer((props) => {
    const {
        store: { $list, $loading, $pagination, $selectedRowKeys, $onSelectChange, $paging, $getList, $clearParams } = defaultStore,
        // selectable为true时表格最前面出现可选复选框
        // 选中复选框的默认操作会注入到BaseTableStore中的$selectedRowKeys中
        selectable = false,
        rowSelection,
        columns,
        rowKey = 'id',
        // 渲染之后是否自动去getList
        autoGetList = true,
        ...rest
    } = props
    let _rowSelection = {
        selectedRowKeys: $selectedRowKeys,
        onChange: $onSelectChange,
    }
    if (rowSelection) {
        _rowSelection = rowSelection
    }
    const _columns = getColumns(columns)
    useEffect(() => {
        if (autoGetList) $getList(1)
        return () => $clearParams()
    }, [])
    return (
        <Table
            rowKey={rowKey}
            columns={_columns}
            dataSource={toJS($list)}
            loading={$loading}
            onChange={$paging}
            pagination={$pagination}
            rowSelection={selectable || rowSelection ? _rowSelection : null}
            {...rest}
        />
    )
})
