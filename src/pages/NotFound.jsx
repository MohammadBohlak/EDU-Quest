// src/pages/NotFound.jsx

import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { MainHeading } from "../components/common/texts/MainHeading";
import { NormalTextShared } from "../components/common/texts/NormalText";
import { PrimarySharedButton } from "../components/common/buttons/PrimaryButton";
import { useTranslation } from "react-i18next";

const Container = styled.div`
  background-color: #fbf1ff;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 1rem;
`;

const NotFound = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <Container>
      <MainHeading>{t("notFound.title")}</MainHeading>
      <NormalTextShared>{t("notFound.message")}</NormalTextShared>
      <PrimarySharedButton
        style={{ width: "fit-content" }}
        onClick={() => navigate("/")}
      >
        {t("notFound.goHome")}
      </PrimarySharedButton>
    </Container>
  );
};

export default NotFound;
