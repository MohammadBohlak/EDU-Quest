import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Form as BootstrapForm } from "react-bootstrap";
import { Formik } from "formik";
import * as Yup from "yup";

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
import Toast from "../../components/ui/toast/Toast";
import { changeLanguage } from "../../store/slices/languageSlice";
import { setTheme } from "../../store/slices/themeSlice";
// import { changeLanguage } from "i18next";

const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [message, setMessage] = useState();
  const [showToast, setShowToast] = useState(false);

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
        console.log(res.data);
        const { token, user } = res.data;
        const lang = user.language;
        const darK_mode = user.darK_mode;
        dispatch(changeLanguage(lang));
        dispatch(setTheme(darK_mode ? "dark" : "light"));
        dispatch(login({ token, user }));
        if (user.role === "admin" || user.role === "publisher") {
          if (user.role === "admin") navigate("/dashboard/users");
          else navigate("/dashboard/courses");
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        setMessage(err.response.data.message);
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 5000);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <SignUpContainer>
      <Toast $err={true} message={message} show={showToast} />
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
