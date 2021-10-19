import React, {useState, useEffect} from 'react'
import {observer} from "mobx-react-lite"
import store from "./store"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"
// Import Swiper styles
import "swiper/swiper.min.css"
import './style.less'

// import Swiper core and required modules
import SwiperCore, {
    Navigation, Thumbs
} from 'swiper'

// install Swiper modules
SwiperCore.use([Navigation,Thumbs])

export default observer(() => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null)
    const {images} = store
    // useEffect(async () => {
    //     await store.getData()
    // }, [])
    return (
        <div className='surprise-container'>
            <div className='barrage-pane'></div>
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
                {images.map(item => (
                    <SwiperSlide><img src={item} alt='奖品图' /></SwiperSlide>
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
                {images.map(item => (
                    <SwiperSlide><img src={item} alt='奖品图' /></SwiperSlide>
                ))}
            </Swiper>
            <input type='text' placeholder='Input Surprise Code' className='surprise-input' />
            <div className='surprise-submit-pane'>
                <button className='surprise-submit'>REDEEM</button>
                <span className='surprise-submit-price'>My Price></span>
            </div>
        </div>
    )
})
