import React from "react";
import { Accordion, AccordionBody } from "react-bootstrap";
import styled from "styled-components";
import { NormalTextSecondary } from "../../../common/texts/NormalText";
import { SmallTextSecondary } from "../../../common/texts/SmallText";
import CustomHeaderAccrodion  from "./CustomHeaderAccrodion";
import { useTranslation } from "react-i18next";

const AccordionContainer = styled.div`
  margin-top: 30px;
  .accordion-button {
    background-color: transparent !important;
    padding: 10px 0;
    &:focus {
      box-shadow: none !important ;
    }
    &::after {
      width: 0;
    }
  }

  @media (max-width: 768px) {
    .accordion-body {
      text-align: center;
    }
    div > span:first-of-type {
      flex-grow: 1;
      text-align: center;
    }
  }
`;

const AnswerBox = styled(SmallTextSecondary)`
  font-size: 16px;
`;

const StyledCustomHeader = styled(Accordion.Header)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
`;

const CustomItem = styled(Accordion.Item)`
  margin-bottom: 10px;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.textSecondary};
`;


const FAQAccordion = () => {
    const { t } = useTranslation();
    return (
    <AccordionContainer>
      <Accordion defaultActiveKey="0">
        {[0, 1, 2, 3].map((index) => (
          <CustomItem key={index} eventKey={index.toString()}>
            <StyledCustomHeader>
              <CustomHeaderAccrodion
                eventKey={index.toString()}
                question={t(`faq.questions.${index}`)}
              />
            </StyledCustomHeader>
            <Accordion.Body>
              <AnswerBox>{t(`faq.answers.${index}`)}</AnswerBox>
            </Accordion.Body>
          </CustomItem>
        ))}
      </Accordion>
    </AccordionContainer>
  );
};


export default FAQAccordion;
