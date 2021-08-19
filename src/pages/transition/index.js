import React, {useState} from "react"
import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group'
import {v4} from 'uuid'
import style from './style.module.css'
import './transition.css'

export default function Transition () {
    const [items, setItems] = useState([
        { id: v4(), text: 'Buy eggs' },
        { id: v4(), text: 'Pay bills' },
        { id: v4(), text: 'Invite friends over' },
        { id: v4(), text: 'Fix the TV' },
        { id: v4(), text: 'Fix the TV2' },
        { id: v4(), text: 'Fix the TV3' }
    ])
    const add = () => {
        const text = prompt('Enter some text')
        setItems(items => [
            { id: v4(), text },
            { id: v4(), text },
            ...items.slice(0, 4)
        ])
    }

    const del = (id) => {
        setItems(items =>
            items.filter(item => item.id !== id)
        )
    }
    return <div>
        <button onClick={add}>add</button>
        <div className={style.list}>
            <TransitionGroup>
                {items.map((item, index) => {
                    return <CSSTransition
                        key={item.id}
                        timeout={500}
                        classNames="item">
                        <div className={style.listItem}>
                            <button onClick={() => del(item.id)}>del</button>
                            {item.text}</div>
                    </CSSTransition>
                })}
            </TransitionGroup>
        </div>
    </div>
}
