import { Container } from "react-bootstrap";
import styled from "styled-components";

// حاوية الـ Swiper مع position relative للسماح بوضع الأزرار خارجها
export const StyledSwiperContainer = styled(Container)`
  margin-top: 30px;
  padding: 2rem 0;
  background-color: transparent;
  position: relative;

  @media (max-width: 768px) {
    margin-top: 60px;
  }
  .swiper-wrapper{
      direction: ltr !important;
    }
    .swiper-slide {
        direction: ${({theme}) => `${theme.lang=="ar"? "rtl" : "ltr"}`} !important;
    }

  /* عند كون العنصر نشطًا، يصبح بلون أحمر */
`;

// زر الملاحة الأساسي مع تنسيقات مشتركة
export const CustomNavButton = styled.button`
  width: 60px;
  height: 60px;
  border: 3px solid ${({ theme }) => theme.colors.primary};
  background-color: transparent;
  color: ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  border-radius: 50%;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateY(-50%);
  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: white;
    border-color: white;
  }
  svg {
    font-size: 25px;
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    svg {
      font-size: 16px;
    }
  }
`;
export const Arrows = styled.div`
  display: flex;
  gap: 10px;
  position: absolute;
  flex-direction: ${({theme}) => `${theme.lang==="en"? "row": "row-reverse"}`};
  right: ${({theme}) => `${theme.lang=="en"? "50px" : "auto"}`} ;
  left: ${({theme}) => `${theme.lang==="ar"? "50px" : "auto"}`} ;
  top: -20px;
  @media (max-width: 768px) {
    right: 50%;
    transform: translateX(50%);
  }
`;
// محتوى الشريحة (الكرت) مع تنسيقات ثابتة وحجم متجاوب
export const SlideContent = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  height: 350px;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  span {
    text-align: ${({ lang }) => `${lang == "en" ? "ltr" : "rtl"}`} !important;
  }
  transition: transform 0.3s ease;
  padding: 30px 40px;
  @media (max-width: 768px) {
    height: 300px;
  }
  transition: all 0.3s;
  .swiper-slide-active & {
    background-color: ${({ theme }) => theme.colors.backgroundMuted};
  }
`;
export const SlideBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  .square {
    width: 175px;
    height: 175px;
    background-color: gray;
    border-radius: 50%;
    @media (max-width: 1200px) {
      width: 120px;
      height: 120px;
    }
    @media (max-width: 768px) {
      width: 80px;
      height: 80px;
    }
  }
`;
