import React from 'react'
export default function DemoComp({store}) {
    return (
        <div>
            <p>DemoComp:{store.count}</p>
            <button onClick={store.onClick}>DemoComp点击</button>
        </div>
    )
}
