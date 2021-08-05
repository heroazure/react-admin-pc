import React, {useMemo} from 'react'
import {useLocalObservable, observer} from "mobx-react-lite"
import DemoComp from './DemoComp'

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
    return (
        <div>
            <h2>这是使用useLocalObservable的示例</h2>
            <p>点击次数：{store.count}</p>
            <p>2倍点击次数：{cont2}</p>
            <DemoComp store={store} />
            <button onClick={store.onClick}>父组件点击</button>
        </div>
    )
})
