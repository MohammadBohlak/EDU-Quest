// src/components/common/modals/ModalForm.jsx

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { NormalTextPrimaryShared } from "./texts/NormalText";
import { SmallTextShared } from "./texts/SmallText";
import { PrimarySharedButton } from "./buttons/PrimaryButton";
// import { PrimarySharedButton } from "../buttons/PrimaryButton";
// import { NormalTextPrimaryShared } from "../texts/NormalText";
// import { SmallTextShared } from "../texts/SmallText";

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
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
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
                  {fields.map((field) => (
                    <FieldWrapper key={field.name}>
                      <SmallTextShared htmlFor={field.name}>
                        {field.label}
                      </SmallTextShared>

                      {field.type === "textarea" ? (
                        <Field
                          as="textarea"
                          id={field.name}
                          name={field.name}
                          rows="4"
                          placeholder={field.placeholder}
                          component={StyledTextarea}
                        />
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

// Styled components

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Container = styled(motion.div)`
  background: #fff;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  padding: 24px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
`;

const Header = styled.div`
  margin-bottom: 16px;
  text-align: center;
`;

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
`;

const StyledInput = styled.input`
  padding: 8px 12px;
  font-size: var(--min-text);
  border: 1px solid #ccc;
  border-radius: 4px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primaryShared};
  }
`;

const StyledTextarea = styled.textarea`
  padding: 8px 12px;
  font-size: var(--min-text);
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primaryShared};
  }
`;

const ErrorText = styled.div`
  color: red;
  font-size: var(--min-text);
`;

const SubmitButton = styled(PrimarySharedButton)`
  /* align-self: flex-start; */
  margin-top: 8px;
`;
