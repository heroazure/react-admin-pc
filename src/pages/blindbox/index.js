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
    const [visiblePrice, setVisiblePrice] = useState(false)
    const {surpriseList, showSurprise, priceList, barrageList, isSupport, surpriseCode,
        onSubmit, onCloseSurprise, setSearch, onChangeCode, initUserInfo} = store
    const location = useLocation()
    const search = new URLSearchParams(location.search)
    useEffect(() => {
        // 注入登陆基本信息
        initUserInfo()
    }, [])
    useEffect(() => {
        setSearch({countryId: search.get('countryId'), languageId: search.get('languageId')})
        store.getBlindBoxConfig()
        store.getBarrage()
        store.getRecordList()
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
                spaceBetween={60}
                centeredSlides={true}
                slidesPerView={2}
                initialSlide={1}
                navigation={false}
                thumbs={{ swiper: thumbsSwiper }}
                className="bigSwiper">
                {surpriseList.map((item, index) => (
                    <SwiperSlide key={index}><img src={xbox} alt='奖品图' /></SwiperSlide>
                ))}
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={10}
                centeredSlides={true}
                slidesPerView={6}
                initialSlide={2}
                freeMode={true}
                watchSlidesProgress={true}
                navigation={false}
                className="smallSwiper">
                {surpriseList.map((item, index) => (
                    <SwiperSlide key={index}><img src={xbox} alt='奖品图' /></SwiperSlide>
                ))}
            </Swiper>
            <input type='text' placeholder='Input Surprise Code' value={surpriseCode} onChange={onChangeCode} className='surprise-input' />
            <div className='surprise-submit-pane'>
                <button className='surprise-submit' onClick={onSubmit}>REDEEM</button>
                <span className='surprise-submit-price' onClick={() => setVisiblePrice(true)}>My Price></span>
            </div>
            <Modal
                popup
                visible={visiblePrice}
                onClose={() => {setVisiblePrice(false)}}
                animationType="slide-up"
                afterClose={() => { console.log('afterClose') }}
            >
                <div className='modal-price-header'>
                    <div className='modal-price-header__title'>My Price</div>
                    <span><img onClick={() => {setVisiblePrice(false)}} className='modal-price-header__close' src={close} alt="close"/></span>
                </div>
                <div className='modal-price-list'>
                    {!!priceList.length && priceList.map((item, index) => (
                        <div className='price-item' key={index}>
                            <div className='price-item-left'>
                                <div className='price-item-left__img'></div>
                                <div className='price-item-left__cnt'>
                                    <p className='p1'>2021/1/1 14:00:00</p>
                                    <p className='p2'>10SAR Coupon <span>2 left</span></p>
                                    <p className='p3'>Code：KIJH3897</p>
                                </div>
                            </div>
                            <div className='price-item-right'>
                                <div className='price-item-right__btn'>USE IT</div>
                                <p>Available before</p>
                                <p>1/1/2022</p>
                            </div>
                        </div>
                    ))}
                    {!priceList.length && <div className='empty-price'>
                        <img src={kong} alt="kong"/>
                        <div>My price list is empty</div>
                    </div>}
                </div>
            </Modal>
            {showSurprise && <Surprise onClose={onCloseSurprise}/>}
        </div>
    )
})
