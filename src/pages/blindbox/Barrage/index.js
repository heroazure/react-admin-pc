import React, {useEffect, useState} from 'react'
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import {v4} from 'uuid'
import './style.less'
// import 'antd-mobile/lib/modal/style/index.less'

let step = 1
const num = 2
let copyListUniq = []
export default function ({data}) {
    const [list, setList] = useState([])
    useEffect(() => {
        step = 1
        copyListUniq = data || []
        setList(copyListUniq.slice(0, num))
    }, [data])
    useEffect(() => {
        const inter = setInterval(() => {
            let lt = copyListUniq.slice(step, step + num)
            if (lt.length < num) {
                if (lt.length === 0) {
                    step = 1
                } else {
                    step++
                }
                lt = [...lt, ...copyListUniq.slice(0, num - lt.length)]
            } else {
                step++
            }
            setList(lt)
        }, 2000)
        return () => clearInterval(inter)
    }, [])
    return <div className='barrage'>
        <TransitionGroup>
            {list.map(item => (
                <CSSTransition key={item.id} timeout={300} classNames="transition-item">
                    <div>
                        <div className='barrage-item'>{item.content}</div>
                    </div>
                </CSSTransition>
            ))}
        </TransitionGroup>
    </div>
}
