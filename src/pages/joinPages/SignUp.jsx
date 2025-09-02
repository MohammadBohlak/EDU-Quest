import React from "react";
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

const SignUp = () => {
  const { t } = useTranslation();

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
            {t("signup.title")}
          </MainHeading>

          <Form.Group controlId="formFirstName">
            <Form.Control type="text" placeholder={t("signup.firstName")} />
          </Form.Group>

          <Form.Group controlId="formLastName">
            <Form.Control type="text" placeholder={t("signup.lastName")} />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Control type="email" placeholder={t("signup.email")} />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Control type="password" placeholder={t("signup.password")} />
          </Form.Group>

          <Form.Group className="d-flex justify-content-center">
            <PrimarySharedButton style={{ width: "200px" }}>
              {t("signup.button")}
            </PrimarySharedButton>
          </Form.Group>
        </StyledForm>
      </RightSection>
    </SignUpContainer>
  );
};

export default SignUp;
