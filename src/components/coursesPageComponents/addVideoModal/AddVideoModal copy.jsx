import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { NormalTextPrimaryShared } from "../../common/texts/NormalText";
import { SmallTextShared } from "../../common/texts/SmallText";
import {
  CloseButton,
  ErrorText,
  FieldWrapper,
  ModalContainer,
  Overlay,
  StyledInput,
  StyledTextarea,
  SubmitButton,
  TimeField,
  TimeRow,
} from "./addVideoModal.styles";

// -------------------- Main Component --------------------
const AddVideoModal = ({ isOpen, setIsOpen, handleSubmit }) => {
  const initialValues = {
    title: "",
    description: "",
    url: "",
    video_order: "",
    hour_duration: "",
    minute_duration: "",
    second_duration: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Video title is required"),
    description: Yup.string(),
    url: Yup.string().required("Video URL is required"),
    video_order: Yup.string().required("Video order is required"),
    hour_duration: Yup.number()
      .typeError("Must be a number")
      .required("Hour is required"),
    minute_duration: Yup.number()
      .typeError("Must be a number")
      .required("Minute is required"),
    second_duration: Yup.number()
      .typeError("Must be a number")
      .required("Second is required"),
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay onClick={() => setIsOpen(false)}>
          <ModalContainer
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <CloseButton onClick={() => setIsOpen(false)}>×</CloseButton>
            <div className="w-100 d-flex justify-content-center">
              <NormalTextPrimaryShared>
                Add New Video to Course
              </NormalTextPrimaryShared>
            </div>

            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, values, handleChange, handleBlur }) => (
                <Form>
                  {[
                    {
                      name: "url",
                      label: "Video URL",
                      type: "text",
                      placeholder: "Enter video URL",
                    },
                    {
                      name: "title",
                      label: "Video Title",
                      type: "text",
                      placeholder: "Enter video title",
                    },
                    {
                      name: "description",
                      label: "Video Description",
                      type: "textarea",
                      placeholder: "Enter a brief description",
                    },
                    {
                      name: "video_order",
                      label: "Video Order in Course",
                      type: "text",
                      placeholder: "e.g. 1 or 2",
                    },
                  ].map(({ name, label, type, placeholder }) => (
                    <FieldWrapper key={name}>
                      <SmallTextShared htmlFor={name}>{label}</SmallTextShared>
                      {type === "textarea" ? (
                        <StyledTextarea
                          as="textarea"
                          name={name}
                          placeholder={placeholder}
                          id={name}
                          rows="4"
                          value={values[name]}
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                      ) : (
                        <StyledInput
                          type={type}
                          name={name}
                          placeholder={placeholder}
                        />
                      )}
                      <ErrorMessage name={name} component={ErrorText} />
                    </FieldWrapper>
                  ))}

                  {/* Time Inputs in One Row */}
                  <SmallTextShared>
                    Exercise Appearance Time (during video)
                  </SmallTextShared>
                  <TimeRow>
                    <TimeField>
                      <StyledInput
                        type="number"
                        name="hour_duration"
                        placeholder="Hours"
                      />
                      <ErrorMessage
                        name="hour_duration"
                        component={ErrorText}
                      />
                    </TimeField>
                    <TimeField>
                      <StyledInput
                        type="number"
                        name="minute_duration"
                        placeholder="Minutes"
                      />
                      <ErrorMessage
                        name="minute_duration"
                        component={ErrorText}
                      />
                    </TimeField>
                    <TimeField>
                      <StyledInput
                        type="number"
                        name="second_duration"
                        placeholder="Seconds"
                      />
                      <ErrorMessage
                        name="second_duration"
                        component={ErrorText}
                      />
                    </TimeField>
                  </TimeRow>

                  <SubmitButton type="submit">Save Video</SubmitButton>
                </Form>
              )}
            </Formik>
          </ModalContainer>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default AddVideoModal;
