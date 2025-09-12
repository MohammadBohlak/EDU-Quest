import React, { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
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

/**
 * Props:
 * - isOpen: boolean للتحكم بظهور المودل
 * - setIsOpen: دالة لإغلاق المودل
 * - videoId: رقم الفيديو المرتبط بالتمرين
 */
const AddPracticeModal = ({
  isOpen,
  setIsOpen,
  videoId,
  refreshVideosList,
}) => {
  const initialValues = {
    question_text: "",
    options: ["", "", ""],
    correct_answer: "",
  };
  useEffect(() => {
    console.log(videoId);
  }, [videoId]);

  const validationSchema = Yup.object({
    question_text: Yup.string().required("سؤال التمرين مطلوب"),
    options: Yup.array()
      .of(Yup.string().required("الخيار مطلوب"))
      .min(1, "يجب إضافة خيار واحد على الأقل"),
    correct_answer: Yup.string()
      .required("الإجابة الصحيحة مطلوبة")
      .test(
        "is-valid",
        "الإجابة الصحيحة يجب أن تكون من الخيارات",
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

    console.log(payload);
    // هنا يمكنك استدعاء axios أو api.post لإرسال البيانات
    api
      .post("questions", payload)
      .then(() => {
        setIsOpen(false);
        refreshVideosList();
      })
      .finally(() => actions.setSubmitting(false));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay>
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
                    <Label htmlFor="question_text">سؤال التمرين</Label>

                    {/* استخدم Field مع as={TextArea} لربط textarea بـ Formik */}
                    <Field
                      as={TextArea}
                      id="question_text"
                      name="question_text"
                      rows="3"
                    />

                    <ErrorMessage name="question_text" component={ErrorText} />
                  </FieldWrapper>

                  <FieldArray name="options">
                    {() =>
                      values.options.map((_, index) => (
                        <FieldWrapper key={index}>
                          <Label htmlFor={`options.${index}`}>
                            الخيار {index + 1}
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
                    <Label htmlFor="correct_answer">الإجابة الصحيحة</Label>
                    <Input id="correct_answer" name="correct_answer" />
                    <ErrorMessage name="correct_answer" component={ErrorText} />
                  </FieldWrapper>

                  <div className="d-flex justify-content-start">
                    <SubmitButton type="submit" disabled={isSubmitting}>
                      إرسال
                    </SubmitButton>
                  </div>
                </Form>
              )}
            </Formik>
          </Container>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default AddPracticeModal;
