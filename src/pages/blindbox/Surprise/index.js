import React from 'react'
import './style.less'
// import gift from './gift.png'
import close from '../images/close.png'
export default function ({onClose, value, languageId}) {
    const map = {
        '1': 'يرجى الاتصال بخدمة العملاء للحصول على هذا المنتج المجاني.',
        '2': 'Please contact custermer service to get this free product.',
        '3': 'Veuillez contacter le service client pour obtenir ce produit gratuit.',
        '4': 'Contáctese con el servicio de atención al cliente para obtener este producto gratuito.',
        '5': 'Please contact custermer service to get this free product.',
        '8': 'Contate o SAC para receber este produto gratuitamente.',
    }
    return <div className='surprise-modal'>
        <div className='surprise-modal-content'>
            <img className='surprise-modal-content__img1' src={value.prizeUrl} alt="奖品"/>
            <div className='surprise-modal-content__name'>{value.prizeName}</div>
            <div className='surprise-modal-content__surprise'>SURPRISE</div>
        </div>
        <div className='surprise-modal__title1'>You Got The {value.prizeName}!</div>
        <div className='surprise-modal__title2'>{map[languageId || '2']}</div>
        <button onClick={onClose} className='surprise-modal__btn'>GOT IT</button>
        <img onClick={onClose} className='surprise-modal__close' src={close} alt="close"/>
    </div>
}
