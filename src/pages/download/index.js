import React, {useEffect, useState} from 'react'
import {TransitionGroup, CSSTransition} from 'react-transition-group'
import {v4} from 'uuid'
import './style.less'

const defaultList = [
    {content: '我是内容1', id: v4()},
    {content: '我是内容2', id: v4()},
    {content: '我是内容3', id: v4()},
    {content: '我是内容4我是内容4', id: v4()},
]
let step = 1
const num = 3
let copyListUniq = []
export default function ({data}) {
    const [list, setList] = useState([])
    useEffect(() => {
        step = 1
        copyListUniq = data || defaultList
        setList(copyListUniq.slice(0, num))
    }, [data])
    useEffect(() => {
        const inter = setInterval(() => {
            let lt = copyListUniq.slice(step, step + num)
            if (!lt.length) {
                step = 1
                lt = copyListUniq.slice(0, num)
            } else {
                step++
            }
            setList(lt)
        }, 2000)
        return () => clearInterval(inter)
    }, [])
    return <div className='barrage-container'>
        <div className='barrage'>
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
    </div>
}
