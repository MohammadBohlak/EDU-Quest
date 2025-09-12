import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { api } from "../../../../utils/api/api";
import {
  CloseBtn,
  Container,
  ErrorText,
  FieldWrapper,
  Input,
  Label,
  Overlay,
  SubmitButton,
  TextArea,
} from "./addPracticeModal.styles";
import Toast from "../../toast/Toast";
import { useState } from "react";

/**
 * Props:
 * - isOpen: boolean للتحكم بظهور المودل
 * - setIsOpen: دالة لإغلاق المودل
 * - videoId: رقم الفيديو المرتبط بالتمرين
 * - refreshVideosList: دالة لإعادة تحميل قائمة الفيديوهات
 */
const AddPracticeModal = ({
  isOpen,
  setIsOpen,
  videoId,
  refreshVideosList,
}) => {
  const { t } = useTranslation();
  const [isErr, setIsErr] = useState(false);
  const [message, setMessage] = useState("");
  const [showToast, setShowToast] = useState(false);

  const initialValues = {
    question_text: "",
    options: ["", "", ""],
    correct_answer: "",
  };

  useEffect(() => {
    console.log(videoId);
  }, [videoId]);

  const validationSchema = Yup.object({
    question_text: Yup.string().required(
      t("addPracticeModal.validation.questionRequired")
    ),
    options: Yup.array()
      .of(
        Yup.string().required(t("addPracticeModal.validation.optionRequired"))
      )
      .min(1, t("addPracticeModal.validation.optionsMin")),
    correct_answer: Yup.string()
      .required(t("addPracticeModal.validation.correctRequired"))
      .test(
        "is-valid",
        t("addPracticeModal.validation.correctInvalid"),
        function (value) {
          const { options } = this.parent;
          return options.includes(value);
        }
      ),
  });

  const handleSubmit = (values, actions) => {
    const payload = {
      video_id: videoId,
      question_text: values.question_text,
      options: values.options,
      correct_answer: values.correct_answer,
    };

    api
      .post("questions", payload)
      .then(() => {
        setMessage("addPracticeModal.success");
        setIsErr(false);
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
          setIsOpen(false);
        }, 3000);
        refreshVideosList();
      })
      .catch((err) => {
        setMessage(err.response.data.message);
        setIsErr(true);
        setShowToast(true);
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
      })

      .finally(() => actions.setSubmitting(false));
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <Overlay onClick={() => setIsOpen(false)}>
            <Container
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <CloseBtn onClick={() => setIsOpen(false)}>X</CloseBtn>

              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ values, isSubmitting }) => (
                  <Form>
                    <FieldWrapper>
                      <Label htmlFor="question_text">
                        {t("addPracticeModal.labels.question")}
                      </Label>
                      <Field
                        as={TextArea}
                        id="question_text"
                        name="question_text"
                        rows="3"
                      />
                      <ErrorMessage
                        name="question_text"
                        component={ErrorText}
                      />
                    </FieldWrapper>

                    <FieldArray name="options">
                      {() =>
                        values.options.map((_, index) => (
                          <FieldWrapper key={index}>
                            <Label htmlFor={`options.${index}`}>
                              {t("addPracticeModal.labels.option", {
                                num: index + 1,
                              })}
                            </Label>
                            <Input
                              id={`options.${index}`}
                              name={`options.${index}`}
                            />
                            <ErrorMessage
                              name={`options.${index}`}
                              component={ErrorText}
                            />
                          </FieldWrapper>
                        ))
                      }
                    </FieldArray>

                    <FieldWrapper>
                      <Label htmlFor="correct_answer">
                        {t("addPracticeModal.labels.correctAnswer")}
                      </Label>
                      <Input id="correct_answer" name="correct_answer" />
                      <ErrorMessage
                        name="correct_answer"
                        component={ErrorText}
                      />
                    </FieldWrapper>

                    <div className="d-flex justify-content-start">
                      <SubmitButton type="submit" disabled={isSubmitting}>
                        {t("addPracticeModal.labels.submit")}
                      </SubmitButton>
                    </div>
                  </Form>
                )}
              </Formik>
            </Container>
          </Overlay>
        )}
      </AnimatePresence>
      <Toast $err={isErr} message={message} show={showToast} />
    </>
  );
};

export default AddPracticeModal;
