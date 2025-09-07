// src/pages/SignUp.jsx

import React from "react";
import { useTranslation } from "react-i18next";
import { Form as BootstrapForm } from "react-bootstrap";
import back from "../../assets/images/loginBack.png";
import { MainHeading } from "../../components/common/texts/MainHeading";
import { PrimarySharedButton } from "../../components/common/buttons/PrimaryButton";
import {
  LeftSection,
  RightSection,
  SignUpContainer,
  StyledForm,
} from "./styles";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const SignUp = () => {
  const { t } = useTranslation();

  const initialValues = {
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required(
      t("signup.requiredUsername") || "First name is required"
    ),

    email: Yup.string()
      .email(t("signup.invalidEmail") || "Invalid email address")
      .required(t("signup.requiredEmail") || "Email is required"),
    password: Yup.string()
      .min(
        6,
        t("signup.minPassword") || "Password must be at least 6 characters"
      )
      .required(t("signup.requiredPassword") || "Password is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
    axios
      .post("https://edu-f.onrender.com/api/register", {
        user_name: values.username,
        email: values.email,
        password: values.password,
        role: "admin",
      })
      .then((res) => {
        console.log("Signup successful:", res.data);
      })
      .catch((err) => {
        console.error("Signup error:", err);
      })
      .finally(() => {
        setSubmitting(false);
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
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              errors,
              isSubmitting,
            }) => (
              <BootstrapForm
                className="d-flex flex-column gap-5"
                noValidate
                onSubmit={handleSubmit}
              >
                <MainHeading className="d-block text-center mb-4">
                  {t("signup.title")}
                </MainHeading>

                <BootstrapForm.Group controlId="formusername">
                  <BootstrapForm.Control
                    type="text"
                    name="username"
                    placeholder={t("signup.username")}
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.username && !!errors.username}
                  />
                  <BootstrapForm.Control.Feedback type="invalid">
                    {errors.username}
                  </BootstrapForm.Control.Feedback>
                </BootstrapForm.Group>

                <BootstrapForm.Group controlId="formEmail">
                  <BootstrapForm.Control
                    type="email"
                    name="email"
                    placeholder={t("signup.email")}
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.email && !!errors.email}
                  />
                  <BootstrapForm.Control.Feedback type="invalid">
                    {errors.email}
                  </BootstrapForm.Control.Feedback>
                </BootstrapForm.Group>

                <BootstrapForm.Group controlId="formPassword">
                  <BootstrapForm.Control
                    type="password"
                    name="password"
                    placeholder={t("signup.password")}
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.password && !!errors.password}
                  />
                  <BootstrapForm.Control.Feedback type="invalid">
                    {errors.password}
                  </BootstrapForm.Control.Feedback>
                </BootstrapForm.Group>

                <BootstrapForm.Group className="d-flex justify-content-center">
                  <PrimarySharedButton
                    type="submit"
                    disabled={isSubmitting}
                    style={{ width: "200px" }}
                  >
                    {t("signup.button")}
                  </PrimarySharedButton>
                </BootstrapForm.Group>
              </BootstrapForm>
            )}
          </Formik>
        </StyledForm>
      </RightSection>
    </SignUpContainer>
  );
};

export default SignUp;
