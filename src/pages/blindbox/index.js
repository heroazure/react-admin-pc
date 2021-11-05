import React, {useState, useEffect} from 'react'
import {useLocation} from "react-router-dom"
import {observer} from "mobx-react-lite"
import {Modal} from "antd-mobile"
import store from "./store"
import xbox from './images/xbox.png'
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"
// Import Swiper styles
import "swiper/swiper.min.css"
import './style.less'
import Barrage from './Barrage'
import Empty from './Empty'
import Surprise from './Surprise'

// import Swiper core and required modules
import SwiperCore, {
    Navigation, Thumbs, Autoplay
} from 'swiper'
import close from "./images/close.png"
import kong from "./images/kong.png"
import ayu from "../download/images/ayu.jpg";
import yingyu from "../download/images/yingyu.jpg";
import fayu from "../download/images/fayu.jpg";
import xibanya from "../download/images/xibanya.jpg";
import xibolai from "../download/images/xibolai.jpg";
import putaoya from "../download/images/putaoya.jpg";

// install Swiper modules
SwiperCore.use([Navigation,Thumbs, Autoplay])

export default observer(() => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null)
    const {surpriseList, showSurprise, recordList, barrageList, descImg, adList, surpriseResult, headImg, remindTitle,
        myPrizeTran, redeemTran, inputTran, disabledBtn,
        isSupport, surpriseCode, showMyPrice, toggleMyPrice, onClickMyPrice, onClickToNative,
        onSubmit, onCloseSurprise, setSearch, onChangeCode, initUserInfo} = store
    const location = useLocation()
    const search = new URLSearchParams(location.search)
    useEffect(() => {
        setSearch({
            countryId: search.get('countryId'),
            languageId: search.get('languageId'),
            terminalType: search.get('terminalType'),
            appVersion: search.get('appVersion')
        })
        // 注入登陆基本信息
        initUserInfo(search.get('userInfo'))
    }, [])
    useEffect(() => {
        store.getBlindBoxConfig()
        store.getBarrage()
        store.getAdByCode()
    }, [])
    if (!isSupport) {
        return <div className='surprise-container'>
            <Empty headImg={headImg} sorryText={remindTitle} />
            <div className='adSwiper-wrap adSwiper-wrap-empty'>
                <Swiper
                    loop={true}
                    navigation={false}
                    className="adSwiper">
                    {adList.map((item, index) => (
                        <SwiperSlide key={index}>
                            <img onClick={() => onClickToNative(item.pageUrl)} src={item.adImgUrl} alt={item.title}/>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    }
    return (
        <div className={`surprise-container ${showMyPrice ? 'hidden' : ''}`}>
            <div className='barrage-pane' style={{backgroundImage: `url(${headImg})`}}>
                <Barrage data={barrageList} languageId={store.params.languageId} rtlClass={store.rtlClass} />
            </div>
            {!!surpriseList.length && <Swiper
                thumbs={{ swiper: thumbsSwiper }}
                loop={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false
                }}
                spaceBetween={60}
                centeredSlides={true}
                slidesPerView={2}
                initialSlide={0}
                navigation={false}
                className="bigSwiper">
                {surpriseList.map((item, index) => (
                    <SwiperSlide key={index}>
                        <img className='bigSwiper__bg' src={xbox} alt='奖品图' />
                        <img className='bigSwiper__surImg' src={item.surpriseImg} alt={item.surpriseName}/>
                        <span className='bigSwiper__surName'>{item.surpriseName}</span>
                    </SwiperSlide>
                ))}
            </Swiper>}
            {!!surpriseList.length && <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false
                }}
                spaceBetween={10}
                centeredSlides={true}
                slidesPerView={6}
                initialSlide={0}
                navigation={false}
                className="smallSwiper">
                {surpriseList.map((item, index) => (
                    <SwiperSlide key={index}>
                        <img className='smallSwiper__bg' src={item.surpriseImg} alt={item.surpriseName} />
                    </SwiperSlide>
                ))}
            </Swiper>}
            <input type='text' placeholder={inputTran} value={surpriseCode} onChange={onChangeCode} className='surprise-input' />
            <div className='surprise-submit-pane'>
                <button className='surprise-submit' disabled={disabledBtn} onClick={onSubmit}>{redeemTran}</button>
                <span className='surprise-submit-price' onClick={onClickMyPrice}>{myPrizeTran}></span>
            </div>
            <div className='adSwiper-wrap'>
                <Swiper
                    autoplay={true}
                    loop={true}
                    navigation={false}
                    className="adSwiper">
                    {adList.map((item, index) => (
                        <SwiperSlide key={index}>
                            <img onClick={() => onClickToNative(item.pageUrl)} src={item.adImgUrl} alt={item.title}/>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            {/*<div className='adSwiper-wrap'>
                <img src={singleImg.adImgUrl} onClick={() => onClickToNative(singleImg.pageUrl)} alt={singleImg.title}/>
            </div>*/}
            <div className='desc-pane'>
                <img src={descImg} alt='描述'/>
            </div>
            <Modal
                popup
                visible={showMyPrice}
                onClose={toggleMyPrice}
                animationType="slide-up"
                afterClose={() => { console.log('afterClose') }}
            >
                <div className='modal-price-header'>
                    <div className='modal-price-header__title'>{myPrizeTran}</div>
                    <span><img onClick={toggleMyPrice} className='modal-price-header__close' src={close} alt="close"/></span>
                </div>
                <div className='modal-price-list'>
                    {!!recordList.length && recordList.map((item, index) => (
                        <div className={`price-item ${store.rtlClass}`} key={index}>
                            <div className='price-item-left'>
                                <div className='price-item-left__img'></div>
                                <div className='price-item-left__cnt'>
                                    <p className='p1'>
                                        {item.gmtCreated}
                                        {![3,4].includes(item.prizeType) && <span>{{
                                            '1': item.availableNumber + 'فرص متبقية ',
                                            '2': item.availableNumber + ' left',
                                            '3': item.availableNumber + ' restants',
                                            '4': 'Quedan ' + item.availableNumber,
                                            '5': item.availableNumber + ' left',
                                            '8': item.availableNumber + ' restantes',
                                        }[store.params.languageId || '2']}</span>}
                                    </p>
                                    <p className='p2'>
                                        {item.prizeName}
                                    </p>
                                    <p className='p3'>{{
                                        '1': 'الكود',
                                        '2': 'Code',
                                        '3': 'Code',
                                        '4': 'Código',
                                        '5': 'Code',
                                        '8': 'Código',
                                    }[store.params.languageId || '2']}：{item.surpriseCode}</p>
                                </div>
                            </div>
                            <div className='price-item-right'>
                                {![3,4].includes(item.prizeType) && <div className='price-item-right__btn' onClick={() => onClickToNative('toCart')}>
                                    {{
                                        '1': 'استخدمه',
                                        '2': 'Use It',
                                        '3': 'Utilisez-le',
                                        '4': 'Úsalo',
                                        '5': 'Use It',
                                        '8': 'Usar',
                                    }[store.params.languageId || '2']}
                                </div>}
                                {![3,4].includes(item.prizeType) && <p>{{
                                    '1': 'متاح قبل ',
                                    '2': 'Available before',
                                    '3': 'Disponible avant le',
                                    '4': 'Disponible antes del',
                                    '5': 'Available before',
                                    '8': 'Disponível antes de',
                                }[store.params.languageId || '2']}</p>}
                                {![3,4].includes(item.prizeType) && <p>{item.expiredTime}</p>}
                            </div>
                        </div>
                    ))}
                    {!recordList.length && <div className='empty-price'>
                        <img src={kong} alt="kong"/>
                        <div>{{
                            '1': 'انها فارغة',
                            '2': 'My prize list is empty',
                            '3': 'c\'est vide',
                            '4': 'esta vacio',
                            '5': 'My prize list is empty',
                            '8': 'My prize list is empty',
                        }[store.params.languageId || '2']}</div>
                    </div>}
                </div>
            </Modal>
            {showSurprise && <Surprise value={surpriseResult} languageId={store.params.languageId} onClose={onCloseSurprise}/>}
        </div>
    )
})
