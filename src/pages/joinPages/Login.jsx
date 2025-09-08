// src/pages/Login.jsx

import React, { use } from "react";
import { useTranslation } from "react-i18next";
import { Form as BootstrapForm } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";

import back from "../../assets/images/loginBack.png";
import { MainHeading } from "../../components/common/texts/MainHeading";
import { NormalTextShared } from "../../components/common/texts/NormalText";
import { PrimarySharedButton } from "../../components/common/buttons/PrimaryButton";
import {
  LeftSection,
  RightSection,
  SignUpContainer,
  StyledForm,
} from "./styles";
import { api } from "../../utils/api/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/slices/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(t("login.invalidEmail") || "Invalid email")
      .required(t("login.requiredEmail") || "Email is required"),
    password: Yup.string()
      .min(
        8,
        t("login.minPassword") || "Password must be at least 6 characters"
      )
      .required(t("login.requiredPassword") || "Password is required"),
  });

  const handleSubmit = (values, { setSubmitting }) => {
    api
      .post("https://edu-f.onrender.com/api/login", {
        email: values.email,
        password: values.password,
      })
      .then((res) => {
        const { token, user } = res.data;
        dispatch(login({ token, user }));
        if (user.role === "admin" || user.role === "publisher") {
          if (user.role === "admin") navigate("/dashboard/users");
          else navigate("/dashboard/courses");
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setSubmitting(false);
      });
    // console.log(values);
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

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <BootstrapForm
                className="d-flex flex-column gap-5"
                noValidate
                onSubmit={handleSubmit}
              >
                <BootstrapForm.Group controlId="formEmail">
                  <BootstrapForm.Control
                    type="email"
                    name="email"
                    placeholder={t("login.email")}
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
                    placeholder={t("login.password")}
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
                    {t("login.button")}
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

export default Login;
