import { Field } from "formik";
import { motion } from "motion/react";
import styled from "styled-components";

// -------------------- Styled Components --------------------
export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;

export const ModalContainer = styled(motion.div)`
  background: white;
  padding: 2rem;
  width: 600px;
  border-radius: 12px;
  max-width: 90%;
  margin: 10vh auto;
  position: relative;

  input:focus,
  textarea :focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primaryShared};
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

export const FieldWrapper = styled.div`
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-weight: bold;
  margin-bottom: 0.3rem;
`;

export const StyledInput = styled(Field)`
  padding: 0.5rem;
  font-size: var(--min-text);
  border: 1px solid #ccc;
  border-radius: 6px;
`;

export const StyledTextarea = styled(Field)`
  padding: 0.5rem;
  font-size: var(--min-text);
  border: 1px solid #ccc;
  border-radius: 6px;
  resize: vertical;
`;

export const ErrorText = styled.div`
  color: red;
  font-size: var(--min-text);
  margin-top: 0.2rem;
`;

export const SubmitButton = styled.button`
  padding: 0.7rem 1.5rem;
  background-color: ${({ theme }) => theme.colors.primaryShared};
  color: white;
  font-size: var(--small-text);
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 1rem;
`;

export const TimeRow = styled.div`
  /* display: flex; */
  gap: 1rem;
  margin-bottom: 1rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const TimeField = styled.div`
  /* flex: 1; */
  display: flex;
  flex-direction: column;
`;
