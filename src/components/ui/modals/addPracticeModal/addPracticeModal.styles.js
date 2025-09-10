import { Field } from "formik";
import { motion } from "motion/react";
import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Container = styled(motion.div)`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 500px;
  max-width: 90%;
  position: relative;
  input,
  textarea {
    font-size: var(--min-text);
    box-sizing: border-box;
  }

  input:focus,
  textarea:focus {
    border: 1px solid ${({ theme }) => theme.colors.primaryShared};
    outline: none;
  }
`;

export const FieldWrapper = styled.div`
  margin-bottom: 15px;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  font-size: var(--min-text);
`;

export const Input = styled(Field)`
  width: 100%;
  padding: 8px;
  height: 40px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
`;

export const ErrorText = styled.div`
  color: red;
  font-size: var(--min-text);
  margin-top: 4px;
`;

export const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: ${({ theme }) => theme.colors.primaryShared};
  color: #fff;
  font-size: var(--min-text);
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.7;
  }
`;
export const CloseBtn = styled.div`
  position: absolute;
  top: 10px;
  right: ${({ theme }) => (theme.lang == "en" ? "10px" : "auto")};
  left: ${({ theme }) => (theme.lang == "ar" ? "10px" : "auto")};
  cursor: pointer;
  font-size: var(--min-text);
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    color: red;
  }
`;
