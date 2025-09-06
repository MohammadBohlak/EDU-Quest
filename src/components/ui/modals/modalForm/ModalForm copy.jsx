// src/components/common/modals/ModalForm.jsx

import React from "react";
import { AnimatePresence } from "framer-motion";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { NormalTextPrimaryShared } from "../../../common/texts/NormalText";
import { SmallTextShared } from "../../../common/texts/SmallText";
import { PrimarySharedButton } from "../../../common/buttons/PrimaryButton";
import {
  Container,
  ErrorText,
  FieldWrapper,
  Header,
  Overlay,
  StyledInput,
  StyledSelect,
  StyledTextarea,
  SubmitButton,
} from "./modalForm.styles";

export default function ModalForm({
  isOpen,
  onClose,
  title,
  fields,
  initialValues,
  validationSchema,
  onSubmit,
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <Container
            initial={{ scale: 1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.5 }} // ← هنا تحدد مدة الأنيميشن بالثواني
            onClick={(e) => e.stopPropagation()}
          >
            <Header>
              <NormalTextPrimaryShared>{title}</NormalTextPrimaryShared>
            </Header>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values, actions) => {
                onSubmit(values);
                actions.setSubmitting(false);
              }}
            >
              {({ isSubmitting }) => (
                <Form>
                  {fields.map((field, index) => (
                    <FieldWrapper key={index}>
                      <SmallTextShared htmlFor={field.name}>
                        {field.label}
                      </SmallTextShared>

                      {field.type === "textarea" ? (
                        <Field
                          // as="textarea"
                          id={field.name}
                          name={field.name}
                          rows="4"
                          placeholder={field.placeholder}
                          component={StyledTextarea}
                          onChange={(e) => {
                            console.log(e.target.value);
                          }}
                        />
                      ) : field.type === "select" ? (
                        <Field
                          as={StyledSelect}
                          id={field.name}
                          name={field.name}
                          component="select"
                        >
                          <option value="">select</option>
                          {field.options?.map((opt, index) => (
                            <option key={index} value={opt.value}>
                              {opt.label}
                            </option>
                          ))}
                        </Field>
                      ) : (
                        <Field
                          as={StyledInput}
                          type={field.type}
                          id={field.name}
                          name={field.name}
                          placeholder={field.placeholder}
                        />
                      )}

                      <ErrorText>
                        <ErrorMessage name={field.name} />
                      </ErrorText>
                    </FieldWrapper>
                  ))}

                  <SubmitButton
                    type="submit"
                    disabled={isSubmitting}
                    as={PrimarySharedButton}
                  >
                    Submit
                  </SubmitButton>
                </Form>
              )}
            </Formik>
          </Container>
        </Overlay>
      )}
    </AnimatePresence>
  );
}
