import React from "react";
import MyContainer from "../../ui/myContainer/MyContainer";
import styled from "styled-components";
import { MainHeading } from "../../common/texts/MainHeading";
import { SmallTextSecondary } from "../../common/texts/SmallText";
import { Row } from "react-bootstrap";
import SwiperTestimonial from "./swiperTestimonial/SwiperTestimonial";
import { useTranslation } from "react-i18next";

const Testimonial = () => {
  const {t} = useTranslation();
  return (
    <StyledTestimonial id="testimonial"> 
      <MyContainer>
        <TopTestimonial>
          <MainHeading>{t("testimonial.title")}</MainHeading>
          <SmallTextSecondary style={{ fontWeight: "700" }}>
            {t("testimonial.question")}
          </SmallTextSecondary>
          <StyledSmallTextSecondary>
            {t("testimonial.description")}
          </StyledSmallTextSecondary>
        </TopTestimonial>
      </MyContainer>
      <SwiperTestimonial />
    </StyledTestimonial>
  );
};

export default Testimonial;

const StyledTestimonial = styled.div`
  margin-top: 100px;
  padding: 50px 0;
  background: ${({ theme }) => theme.colors.backgroundSections};
`;
const StyledSmallTextSecondary = styled(SmallTextSecondary)`
  width: 80%;
  @media (max-width: 768px) {
    width: 100% !important;
  }
`;

const TopTestimonial = styled(Row)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media (max-width: 768px) {
    text-align: center;
  }
  span {
    /* margin: 10px 0 ; */
  }
`;
