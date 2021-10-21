import React from 'react'
import {useParams} from "react-router-dom"
import './style.less'
import xibolai from './images/xibolai.jpg'
import yingyu from './images/yingyu.jpg'
import xibanya from './images/xibanya.jpg'
import putaoya from './images/putaoya.jpg'
import fayu from './images/fayu.jpg'
import ayu from './images/ayu.jpg'
export default function () {
    const {language} = useParams()
    const map = {
        '1': xibolai,
        '2': yingyu,
        '3': xibanya,
        '4': putaoya,
        '5': fayu,
        '6': ayu,
    }
    const toDownload = () => {
        const isIos = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
        window.location.href = isIos ? 'http://itunes.apple.com/us/app/id1525111750?mt=8' : 'http://play.google.com/store/apps/details?id=com.chic.point'
    }

    return <>
        <img onClick={toDownload} className='download-img' src={map[language] || yingyu} alt="下载图"/>
    </>
}
