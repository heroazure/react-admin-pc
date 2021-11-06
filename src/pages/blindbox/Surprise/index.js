import React from 'react'
import './style.less'
// import gift from './gift.png'
import close from '../images/close.png'
import store from "../store";
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
            <div className='surprise-modal-content__name'>{(value.prizeName || '').slice(0, 32)}</div>
            <div className='surprise-modal-content__surprise'>
                {{
                    '1': 'مفاجأة',
                    '2': 'SURPRISE',
                    '3': 'SURPRISE',
                    '4': 'SORPRESA',
                    '5': 'SURPRISE',
                    '8': 'SURPRESA',
                }[languageId || '2']}
                </div>
        </div>
        <div className='surprise-modal__title1'>
            {{
                '1': ' أنت حصلت ',
                '2': 'You Got ',
                '3': 'Vous avez gagné ',
                '4': 'Lo ha recibido ',
                '5': 'You Got ',
                '8': 'Você recebeu ',
            }[languageId || '2']}
            {value.prizeName}!</div>
        {value.prizeType === 4 && <div className='surprise-modal__title2'>{map[languageId || '2']}</div>}
        <button onClick={onClose} className='surprise-modal__btn'>
            {{
                '1': 'احصل عليه',
                '2': 'GOT IT',
                '3': 'J\'accepte',
                '4': 'Entendido',
                '5': 'GOT IT',
                '8': 'Ok',
            }[languageId || '2']}</button>
        <img onClick={onClose} className='surprise-modal__close' src={close} alt="close"/>
    </div>
}
