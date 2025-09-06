import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Form } from "react-bootstrap";
import back from "../../assets/images/loginBack.png";
import { MainHeading } from "../../components/common/texts/MainHeading";
import { PrimarySharedButton } from "../../components/common/buttons/PrimaryButton";
import {
  LeftSection,
  RightSection,
  SignUpContainer,
  StyledForm,
} from "./styles";
import { NormalTextShared } from "../../components/common/texts/NormalText";
import axios from "axios";

const Login = () => {
  const { t } = useTranslation();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://edu-f.onrender.com/api/login", { email, password })
      .then((res) => {
        console.log(res.data);
      });
  };
  return (
    <SignUpContainer>
      <LeftSection>
        <img className="img1" src={back} alt="background" />
        <img className="img2" src={back} alt="background" />
        <img className="img3" src={back} alt="background" />
      </LeftSection>
      <RightSection>
        <StyledForm>
          <MainHeading className="d-block text-center">
            {t("login.title")}
          </MainHeading>
          <NormalTextShared className="d-block text-center mb-5">
            {t("login.subtitle")}
          </NormalTextShared>

          <Form.Group controlId="formEmail">
            <Form.Control
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder={t("login.email")}
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Control
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder={t("login.password")}
            />
          </Form.Group>

          <Form.Group className="d-flex justify-content-center">
            <PrimarySharedButton
              onClick={(e) => handleSubmit(e)}
              style={{ width: "200px" }}
            >
              {t("login.button")}
            </PrimarySharedButton>
          </Form.Group>
        </StyledForm>
      </RightSection>
    </SignUpContainer>
  );
};

export default Login;
