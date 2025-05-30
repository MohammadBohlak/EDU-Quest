import React from "react";
import img from "../../../assets/images/about.jpg";
import { Col, Row } from "react-bootstrap";
import { MainHeadingPrimaryShared } from "../../common/texts/MainHeading";
import MyContainer from "../../ui/myContainer/MyContainer";
import { SmallTextShared } from "../../common/texts/SmallText";
import { AboutRight, StyledAboutUs } from "./aboutUs.styles";
import { useTranslation } from "react-i18next";
const AboutUs = () => {
  const { t } = useTranslation();

  return (
    <StyledAboutUs id="about">
      <MyContainer>
        <MainHeadingPrimaryShared>
          {t("aboutUs.title")}
        </MainHeadingPrimaryShared>
        <Row className="align-items-center">
          <Col md={6} sm={12} className="d-flex flex-column">
            <SmallTextShared style={{ fontWeight: "700", margin: "28px 0" }}>
              {t("aboutUs.welcomeMessage")}
            </SmallTextShared>
            <SmallTextShared>{t("aboutUs.description")}</SmallTextShared>
          </Col>
          <AboutRight md={6} sm={12}>
            <img src={img} />
          </AboutRight>
        </Row>
      </MyContainer>
    </StyledAboutUs>
  );
};
export default AboutUs;
