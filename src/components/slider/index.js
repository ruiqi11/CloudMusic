import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay} from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import {SliderContainer} from './style'

function Slider(props) {
  const {bannerList} = props
  return (
    <SliderContainer>
      <div className="before"></div>
      <Swiper 
      modules={[Pagination, Autoplay]}
      loop={true} // 开启环路
      pagination={{ 
        el: '.swiper-pagination',
        type: 'bullets' }}
      autoplay={{
        delay: 3000,
        stopOnLastSlide: false,
        disableOnInteraction: false}}>
        {
          bannerList.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <img src={item.imageUrl} width="100%" height="100%" alt="推荐"/>
              </SwiperSlide>
            )
          })
        }
      </Swiper>
      <div className="swiper-pagination"></div>
    </SliderContainer>
  )
}
export default React.memo(Slider)
