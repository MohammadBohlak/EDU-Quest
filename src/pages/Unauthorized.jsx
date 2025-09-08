// src/pages/Unauthorized.jsx

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

const Unauthorized = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <Container>
      <MainHeading>{t("unauthorized.title")}</MainHeading>
      <NormalTextShared className="mb-4">
        {t("unauthorized.message")}
      </NormalTextShared>
      <div className="d-flex align-items-center gap-5">
        <PrimarySharedButton
          style={{ width: "fit-content" }}
          onClick={() => navigate("/")}
        >
          {t("unauthorized.goHome")}
        </PrimarySharedButton>

        <PrimarySharedButton
          style={{ width: "fit-content" }}
          onClick={() => navigate(-1)}
        >
          {t("unauthorized.goBack")}
        </PrimarySharedButton>
      </div>
    </Container>
  );
};

export default Unauthorized;
