import React, { useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { SmallTextShared } from "../../../common/texts/SmallText";
import {
  NormalTextPrimaryShared,
  NormalTextShared,
} from "../../../common/texts/NormalText";
import { Arrows, CustomNavButton, SlideBottom, SlideContent, StyledSwiperContainer } from "./swiperTestimonial.styles";
import { useTranslation } from "react-i18next";

const SwiperTestimonial = () => {
  //   للحصول على إشارات للأزرار المخصصة
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const {t} = useTranslation() ; 

  
  return (
    <StyledSwiperContainer fluid>
      <Swiper
        modules={[Navigation, Pagination, EffectCoverflow]}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onBeforeInit={(swiper) => {
          // ربط إشارات الأزرار بالتنقل قبل تهيئة الـ swiper
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
        }}
        // pagination={{ clickable: true }}
        effect="coverflow"
        centeredSlides={true}
        spaceBetween={80}
        slidesPerView={3}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
          slideShadows: false,
        }}
        breakpoints={{
          0: {
            slidesPerView: 1.3, // تحديد عدد الشرائح التي ستظهر في العرض في هذا الحجم من الشاشة (2 شرائح مرئية)
            spaceBetween: 50, // تحديد المسافة بين كل شريحة وأخرى بـ 50 بكسل

            coverflowEffect: {
              rotate: 0, // زاوية دوران الشرائح، هنا لا يوجد دوران إضافي
              stretch: 0, // مقدار التمدد بين الشرائح، عند 0 لن يكون هناك تمدد إضافي
              depth: 50, // تحديد عمق تأثير الـ Coverflow ثلاثي الأبعاد، كلما زادت القيمة زاد العمق
              modifier: 2, // معامل التأثير، يُستخدم للتحكم في مدى تطبيق تأثير الـ Coverflow على الشرائح
              slideShadows: false, // تعطيل الظلال التي تظهر خلف الشرائح لتعطي إحساسًا ثلاثي الأبعاد
            },
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 80,
            coverflowEffect: {
              rotate: 0,
              stretch: 0,
              depth: 80,
              modifier: 2,
              slideShadows: false,
            },
          },
          1200: {
            slidesPerView: 2,
            spaceBetween: 200,
            coverflowEffect: {
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
              slideShadows: false,
            },
          },
        }}
      >
        {[1,2,3,4,5,6,7].map((index)=> (
          <SwiperSlide key= {index}>
          <SlideContent>
            <SmallTextShared>
            {t("testimonialSwiper.quote")}
            </SmallTextShared>
            <SlideBottom>
              <div className="square"> </div>
              <div>
                <div>
                  <NormalTextPrimaryShared>
                   {t("testimonialSwiper.name")}
                  </NormalTextPrimaryShared>
                </div>
                <NormalTextShared>
                  {t("testimonialSwiper.date")}
                </NormalTextShared>
              </div>
            </SlideBottom>
          </SlideContent>
        </SwiperSlide>
        ))}
      </Swiper>
      {/* الأزرار المخصصة خارج منطقة الـ Swiper */}
      <Arrows>
        <CustomNavButton ref={prevRef}>
          <FaArrowLeftLong />
        </CustomNavButton>
        <CustomNavButton ref={nextRef}>
          <FaArrowRightLong />
        </CustomNavButton>
      </Arrows>
    </StyledSwiperContainer>
  );
};

export default SwiperTestimonial;
