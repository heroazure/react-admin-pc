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
    // useEffect(async () => {
    //     await store.getData()
    // }, [])
    return (
        <>
            <Swiper
                style={{'--swiper-navigation-color': '#fff','--swiper-pagination-color': '#fff'}}
                loop={false}
                spaceBetween={10}
                centeredSlides={true}
                slidesPerView={2}
                initialSlide={1}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper }}
                className="mySwiper2">
                <SwiperSlide><img src="https://swiperjs.com/demos/images/nature-1.jpg" /></SwiperSlide>
                <SwiperSlide><img src="https://swiperjs.com/demos/images/nature-2.jpg" /></SwiperSlide>
                <SwiperSlide><img src="https://swiperjs.com/demos/images/nature-3.jpg" /></SwiperSlide>
                <SwiperSlide><img src="https://swiperjs.com/demos/images/nature-4.jpg" /></SwiperSlide>
                <SwiperSlide><img src="https://swiperjs.com/demos/images/nature-5.jpg" /></SwiperSlide>
                <SwiperSlide><img src="https://swiperjs.com/demos/images/nature-6.jpg" /></SwiperSlide>
                <SwiperSlide><img src="https://swiperjs.com/demos/images/nature-7.jpg" /></SwiperSlide>
                <SwiperSlide><img src="https://swiperjs.com/demos/images/nature-8.jpg" /></SwiperSlide>
                <SwiperSlide><img src="https://swiperjs.com/demos/images/nature-9.jpg" /></SwiperSlide>
                <SwiperSlide><img src="https://swiperjs.com/demos/images/nature-10.jpg" /></SwiperSlide>
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                loop={true}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                className="mySwiper">
                <SwiperSlide><img src="https://swiperjs.com/demos/images/nature-1.jpg" /></SwiperSlide>
                <SwiperSlide><img src="https://swiperjs.com/demos/images/nature-2.jpg" /></SwiperSlide>
                <SwiperSlide><img src="https://swiperjs.com/demos/images/nature-3.jpg" /></SwiperSlide>
                <SwiperSlide><img src="https://swiperjs.com/demos/images/nature-4.jpg" /></SwiperSlide>
                <SwiperSlide><img src="https://swiperjs.com/demos/images/nature-5.jpg" /></SwiperSlide>
                <SwiperSlide><img src="https://swiperjs.com/demos/images/nature-6.jpg" /></SwiperSlide>
                <SwiperSlide><img src="https://swiperjs.com/demos/images/nature-7.jpg" /></SwiperSlide>
                <SwiperSlide><img src="https://swiperjs.com/demos/images/nature-8.jpg" /></SwiperSlide>
                <SwiperSlide><img src="https://swiperjs.com/demos/images/nature-9.jpg" /></SwiperSlide>
                <SwiperSlide><img src="https://swiperjs.com/demos/images/nature-10.jpg" /></SwiperSlide>
            </Swiper>
        </>
    )
})
