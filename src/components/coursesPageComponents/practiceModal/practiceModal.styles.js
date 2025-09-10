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
  z-index: 100000000;
`;

export const ModalContainer = styled(motion.div)`
  background-color: white;
  padding: 20px;
  border-radius: 12px;
  width: 400px;
  max-width: 90%;
`;

export const QuestionText = styled.h3`
  margin-bottom: 15px;
`;

export const Option = styled.label`
  display: block;
  margin-bottom: 10px;
  cursor: pointer;
  font-size: var(--min-text);
`;

export const SubmitButton = styled.button`
  margin-top: 20px;
  padding: 10px 15px;
  background-color: ${({ theme }) => theme.colors.primaryShared};
  color: white;
  font-size: var(--min-text);
  border: 2px solid ${({ theme }) => theme.colors.primaryShared};
  border-radius: 8px;
  cursor: pointer;
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  &:hover {
    color: ${({ theme }) => theme.colors.primaryShared};
    background-color: white;
  }
`;
