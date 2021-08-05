import {Space} from "antd"
import detailStore from '../DetailModal/store'
import store from './store'

export default [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
    },
    {
        title: 'Tags',
        key: 'tags'
    },
    {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
            <Space size="middle">
                <a onClick={() => detailStore.showModal(record)}>查看</a>
                <a onClick={() => store.del(record.key)}>删除</a>
                <a onClick={() => store.update(record)}>更新</a>
            </Space>
        ),
    },
]
