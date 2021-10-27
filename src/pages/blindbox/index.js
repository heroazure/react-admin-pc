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
    Navigation, Thumbs
} from 'swiper'
import close from "./images/close.png"
import kong from "./images/kong.png"

// install Swiper modules
SwiperCore.use([Navigation,Thumbs])

export default observer(() => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null)
    const {surpriseList, showSurprise, recordList, barrageList, descImg, adList, singleImg, surpriseResult,
        isSupport, surpriseCode, showMyPrice, toggleMyPrice, onClickMyPrice, onClickToNative,
        onSubmit, onCloseSurprise, setSearch, onChangeCode, initUserInfo} = store
    const location = useLocation()
    const search = new URLSearchParams(location.search)
    useEffect(() => {
        setSearch({countryId: search.get('countryId'), languageId: search.get('languageId')})
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
            <Empty />
        </div>
    }
    return (
        <div className='surprise-container'>
            <div className='barrage-pane'>
                <Barrage data={barrageList} />
            </div>
            <Swiper
                style={{'--swiper-navigation-color': '#fff','--swiper-pagination-color': '#fff'}}
                loop={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false
                }}
                spaceBetween={60}
                centeredSlides={true}
                slidesPerView={2}
                initialSlide={1}
                navigation={false}
                thumbs={{ swiper: thumbsSwiper }}
                className="bigSwiper">
                {surpriseList.map((item, index) => (
                    <SwiperSlide key={index}>
                        <img className='bigSwiper__bg' src={xbox} alt='奖品图' />
                        <img className='bigSwiper__surImg' src={item.surpriseImg} alt={item.surpriseName}/>
                        <span className='bigSwiper__surName'>{item.surpriseName}</span>
                    </SwiperSlide>
                ))}
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false
                }}
                spaceBetween={10}
                centeredSlides={true}
                slidesPerView={6}
                initialSlide={2}
                freeMode={true}
                watchSlidesProgress={true}
                navigation={false}
                className="smallSwiper">
                {surpriseList.map((item, index) => (
                    <SwiperSlide key={index}>
                        <img className='smallSwiper__bg' src={item.surpriseImg} alt={item.surpriseName} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <input type='text' placeholder='Input Surprise Code' value={surpriseCode} onChange={onChangeCode} className='surprise-input' />
            <div className='surprise-submit-pane'>
                <button className='surprise-submit' onClick={onSubmit}>REDEEM</button>
                <span className='surprise-submit-price' onClick={onClickMyPrice}>My Price></span>
            </div>
            <div className='adSwiper-wrap'>
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
            </div>singleImg
            <div className='adSwiper-wrap'>
                <img src={singleImg.adImgUrl} onClick={() => onClickToNative(singleImg.pageUrl)} alt={singleImg.title}/>
            </div>
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
                    <div className='modal-price-header__title'>My Price</div>
                    <span><img onClick={toggleMyPrice} className='modal-price-header__close' src={close} alt="close"/></span>
                </div>
                <div className='modal-price-list'>
                    {!!recordList.length && recordList.map((item, index) => (
                        <div className='price-item' key={index}>
                            <div className='price-item-left'>
                                <div className='price-item-left__img'></div>
                                <div className='price-item-left__cnt'>
                                    <p className='p1'>2021/1/1 14:00:00</p>
                                    <p className='p2'>{item.prizeName} <span>{item.availableNumber} left</span></p>
                                    <p className='p3'>Code：{item.surpriseCode}</p>
                                </div>
                            </div>
                            <div className='price-item-right'>
                                <div className='price-item-right__btn'>USE IT</div>
                                <p>Available before</p>
                                <p>1/1/2022</p>
                            </div>
                        </div>
                    ))}
                    {!recordList.length && <div className='empty-price'>
                        <img src={kong} alt="kong"/>
                        <div>My price list is empty</div>
                    </div>}
                </div>
            </Modal>
            {showSurprise && <Surprise value={surpriseResult} onClose={onCloseSurprise}/>}
        </div>
    )
})
