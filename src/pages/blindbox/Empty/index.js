import React from 'react'
import empty from './empty.png'
// import bigtitle2 from './bigtitle2.png'
import './style.less'
export default function ({headImg, sorryText}) {
    return <div className='empty-container'>
        <img className='empty-container__img1' src={headImg} alt="bigtitle"/>
        <br/>
        <img className='empty-container__img2' src={empty} alt="Sorry, activity is unavailable."/>
        <div>{sorryText}</div>
    </div>
}
