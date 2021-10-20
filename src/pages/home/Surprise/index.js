import React from 'react'
import './style.less'
import gift from './gift.png'
import close from '../images/close.png'
export default function ({onClose}) {
    return <div className='surprise-modal'>
        <div className='surprise-modal-content'>
            <img className='surprise-modal-content__img1' src={gift} alt="奖品"/>
            <div className='surprise-modal-content__name'>COD Free*3</div>
            <div className='surprise-modal-content__surprise'>SURPRISE</div>
        </div>
        <div className='surprise-modal__title1'>You Got The Lipstick*3!</div>
        <button onClick={onClose} className='surprise-modal__btn'>GOT IT</button>
        <img onClick={onClose} className='surprise-modal__close' src={close} alt="close"/>
    </div>
}
