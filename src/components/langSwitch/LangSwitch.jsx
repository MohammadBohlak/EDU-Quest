import React, { useState } from "react";
import styled from "styled-components";
import arFlag from "../../assets/images/ar.png"; 
import enFlag from "../../assets/images/en.png";  
import { useTranslation } from 'react-i18next';
import { changeLanguage } from "../../store/slices/languageSlice";
import { useDispatch } from "react-redux";

const SwitchWrapper = styled.div`
  display: grid ; 
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 1fr;
  background-color: ${({theme}) => theme.colors.secondary} ;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  height: 40px;
  padding: 0 ;
  border-radius: 10px;
  align-items: center;
  overflow: hidden;
  width: 150px ;
  @media (max-width: 480px){
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
  img{
    max-width: 90%;
    padding: 5px;
    object-fit: contain;
  }
`;

const LanguageText = styled.div`
  font-size: 16px;
  text-align: center;
  color: #007bff !important ; 

`;

const LanguageSwitcher = () => {
  const [language, setLanguage] = useState("ar");
  const dispatch = useDispatch() ; 
  const { i18n } = useTranslation();

  // دالة التبديل بين اللغتين
  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "ar" ? "en" : "ar"));
    i18n.changeLanguage(language);
    dispatch(changeLanguage())

  };

  return (
    <SwitchWrapper onClick={toggleLanguage}>
      <Flag>
        <img src={language === "ar" ? arFlag : enFlag} alt="Flag" />
      </Flag>

      <LanguageText>{language === "ar" ? "العربية" : "English"}</LanguageText>

    </SwitchWrapper>
  );
};

export default LanguageSwitcher;
