import React from "react";
import { Col, Row } from "react-bootstrap";

import MyContainer from "../../ui/myContainer/MyContainer";
import styled from "styled-components";
import { NormalText, NormalTextSecondary } from "../../common/texts/NormalText";
import { SmallTextSecondary } from "../../common/texts/SmallText";
import {
  MainHeading,
  MainHeadingSecondary,
} from "../../common/texts/MainHeading";
import PrimaryButton from "../../common/buttons/PrimaryButton";
import SecondaryButton from "../../common/buttons/SecondaryButton";
import FAQAccordion from "./accrodion/FAQAccordion";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import {
  scrollLeftAnimation,
  scrollRightAnimation,
} from "../../../assets/animations";
import { useTheme } from "styled-components";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";

const Temp = styled.div`
  height: 500px;
`;
const StyledFAQSection = styled(Row)`
  /* background-color: ${({ theme }) => theme.colors.backgroundSections}; */
  padding: 80px 0px;
  margin: 100px 0 0 0;
`;

const SubSection = styled(motion.div)`
  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const FAQLeft = styled(Col)`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 10px;
  @media (max-width: 768px) {
    text-align: center;
    margin-bottom: 50px;
  }
`;
const FAQTitle = styled.div`
  @media (max-width: 768px) {
    justify-content: center;
  }
`;
export default function FAQSection() {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <motion.div
      initial={{ backgroundColor: "#fff" }}
      whileInView={{ backgroundColor: theme.colors.backgroundSections }}
      transition={{ duration: 1 }}
      viewport={{ once: true, amount: 0.5 }}
    >
      <StyledFAQSection className="overflow-hidden" id="questions">
        <MyContainer>
          <Row className="justify-content-between">
            <Col md={12}>
              <motion.div {...scrollLeftAnimation}>
                <FAQTitle
                  className="d-flex column-gap-2"
                  style={{ marginBottom: "50px" }}
                >
                  <MainHeadingSecondary>{t("faq.title1")}</MainHeadingSecondary>
                  <MainHeading>{t("faq.title2")}</MainHeading>
                  <MainHeadingSecondary>{t("faq.title3")}</MainHeadingSecondary>
                </FAQTitle>
              </motion.div>
            </Col>

            <FAQLeft md={4}>
              {/* <motion.div {...scrollLeftAnimation}> */}
              <NormalTextSecondary
                {...scrollLeftAnimation}
                className="d-block"
                style={{ fontWeight: "700", width: "100%" }}
              >
                {t("faq.subtitle")}
              </NormalTextSecondary>
              {/* </motion.div> */}
              <motion.div {...scrollLeftAnimation}>
                <SmallTextSecondary style={{ fontWeight: "normal" }}>
                  {t("faq.description")}
                </SmallTextSecondary>
              </motion.div>
              <SubSection
                {...scrollLeftAnimation}
                className="d-flex flex-column justify-content-center row-gap-5 w-100 mt-5"
              >
                <PrimaryButton>{t("faq.otherQuestionsButton")}</PrimaryButton>
                <SecondaryButton>{t("faq.addQuestionButton")}</SecondaryButton>
              </SubSection>
            </FAQLeft>

            <Col md={6}>
              <motion.div {...scrollRightAnimation}>
                <SubSection>
                  <NormalText style={{ fontWeight: "bold" }}>
                    {t("faq.frequentlyQuestions")}
                  </NormalText>
                </SubSection>
                <FAQAccordion />
              </motion.div>
            </Col>
          </Row>
        </MyContainer>
      </StyledFAQSection>
    </motion.div>
  );
}
