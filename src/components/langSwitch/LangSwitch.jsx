import React, { useState } from "react";
import styled from "styled-components";
import arFlag from "../../assets/images/ar.png";
import enFlag from "../../assets/images/en.png";
import { useTranslation } from "react-i18next";
import { changeLanguage } from "../../store/slices/languageSlice";
import { useDispatch, useSelector } from "react-redux";
import { api } from "../../utils/api/api";

const SwitchWrapper = styled.button`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 1fr;
  background-color: ${({ theme }) => theme.colors.secondary};
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.25);
  height: 40px;
  padding: 0;
  border: none;
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
  color: #007bff !important ;
`;

const LanguageSwitcher = () => {
  // const [language, setLanguage] = useState("en");
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  const currentLang = useSelector((state) => state.lang.language);
  // دالة التبديل بين اللغتين
  const toggleLanguage = () => {
    const newLang = currentLang === "ar" ? "en" : "ar";
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (token && user) {
      const userId = user.id;
      api
        .put(
          `users/${userId}`,
          { language: newLang },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          const updatedLang = res.data.user.language;
          i18n.changeLanguage(updatedLang);
          dispatch(changeLanguage(updatedLang));
        });
    } else {
      dispatch(changeLanguage(newLang));
      i18n.changeLanguage(newLang);
    }
  };

  return (
    <SwitchWrapper onClick={toggleLanguage}>
      <Flag>
        <img src={currentLang === "en" ? arFlag : enFlag} alt="Flag" />
      </Flag>

      <LanguageText>
        {currentLang === "en" ? "العربية" : "English"}
      </LanguageText>
    </SwitchWrapper>
  );
};

export default LanguageSwitcher;
