import React from "react";
import styled from "styled-components";
import arFlag from "../../assets/images/ar.png";
import enFlag from "../../assets/images/en.png";
import { toggleLanguage } from "../../store/slices/languageSlice";
import { useDispatch, useSelector } from "react-redux";

const SwitchWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 1fr;
  background-color: ${({ theme }) => theme.colors.secondary};
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  height: 40px;
  padding: 0;
  border-radius: 10px;
  align-items: center;
  overflow: hidden;
  width: 150px;
  @media (max-width: 480px) {
    width: 100px;
  }
  &:hover {
    background-color: #e0e0e0;
  }
`;

const Flag = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  background-color: white;
  img {
    max-width: 90%;
    padding: 5px;
    object-fit: contain;
  }
`;

const LanguageText = styled.div`
  font-size: 16px;
  text-align: center;
  color: #007bff !important;
`;

const LanguageSwitcher = () => {
  // مصدر الحقيقة الوحيد للغة هو Redux (والذي بدوره يبقى متزامناً مع i18n عبر listener middleware)
  const language = useSelector((state) => state.lang.language);
  const dispatch = useDispatch();

  const onToggle = () => {
    dispatch(toggleLanguage());
  };

  return (
    <SwitchWrapper onClick={onToggle}>
      <Flag>
        <img src={language === "ar" ? arFlag : enFlag} alt="Flag" />
      </Flag>
      <LanguageText>{language === "ar" ? "العربية" : "English"}</LanguageText>
    </SwitchWrapper>
  );
};

export default LanguageSwitcher;
