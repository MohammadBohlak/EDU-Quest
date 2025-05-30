import { Card, Container } from "react-bootstrap";
import styled from "styled-components";

// حاوية الـ slider مع تنسيق مخصص عبر styled-components
export const StyledSwiperContainer = styled.div`
  /* direction: ltr !important ;  */
  /* padding: 2rem 0px ; */

  .swiper-button-prev,
  .swiper-button-next {
    color: ${({ theme }) => theme.colors.primaryShared || "#a45dbe"};
    position: absolute;
    border-radius: 50%;
    border: 1px solid ${({ theme }) => theme.colors.primaryShared};
    width: 60px;
    height: 60px;
    top: 100%;
    transform: translateY(-67%);
    z-index: 1000; 
  }
  .swiper-button-prev {
    left: 0px;
  }
  .swiper-button-next {
    right: 0px;
  }
  .swiper-pagination-bullet {
    width: 30px;
    height: 30px;
    text-align: center;
    line-height: 30px;
    font-size: var(--small-text);
    color: #000;
    opacity: 1;
    background: rgba(0, 0, 0, 0.2);
    transform: translateY(5px);
  }

  .swiper-pagination-bullet-active {
    color: #fff;
    background: ${({ theme }) => theme.colors.primaryShared};
  }
  .swiper {
    padding: 60px 0;
  }
  @media (max-width: 768px) {
    .swiper {
      padding: 70px;
    }
    .swiper-button-prev,
    .swiper-button-next {
      top: 50%;
      transform: translateY(-50%);
    }
    .swiper-pagination-bullet {
      width: 20px;
      height: 20px;
      line-height: 20px;
    }
  }
`;

export const CourseCard = styled(Card)`
  width: 100%;
  border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  background-color: ${({ theme }) =>
    theme.colors.backgroundMutedShared || "#f8f9fa"};
  border-radius: 25px;
  padding: 15px;
  &:hover {
    transform: scale(1.02);
  }
`;

export const CourseImage = styled(Card.Img)`
  height: 200px;
  object-fit: cover;
  border-radius: 25px;
`;

export const CourseBody = styled(Card.Body)`
  padding: 10px 0px;
`;
