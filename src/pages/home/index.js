import React, {useMemo, useState} from 'react'
import {useLocalObservable, observer} from "mobx-react-lite"
import DemoComp from './DemoComp'
import TreeTransfer from './TreeTransfer'

export default observer(() => {
    const store = useLocalObservable(() => ({
        count: 0,
        increase: () => {
            store.count += 1
        },
        onClick: () => {
            store.increase()
        }
    }))
    const cont2 = useMemo(() => {return store.count * 2}, [store.count])
    const treeData = [
        { key: '0-0', title: '0-0' },
        {
            key: '0-1',
            title: '0-1',
            children: [
                { key: '0-1-0', title: '0-1-0' },
                { key: '0-1-1', title: '0-1-1' },
            ],
        },
        { key: '0-2', title: '0-3' },
    ];
    const [targetKeys, setTargetKeys] = useState(["0-0", "0-1-0"]);
    const onChange = keys => {
        setTargetKeys(keys);
        console.log('keys:', keys)
    };
    return (
        <div>
            <h2>这是使用useLocalObservable的示例</h2>
            <p>点击次数：{store.count}</p>
            <p>2倍点击次数：{cont2}</p>
            <DemoComp store={store} />
            <button id='parentId' onClick={store.onClick}>父组件点击</button>
            <TreeTransfer dataSource={treeData} targetKeys={targetKeys} onChange={onChange} />
        </div>
    )
})
