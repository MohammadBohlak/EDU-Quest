import styled from "styled-components";
import { PrimarySharedButton } from "../buttons/PrimaryButton";
import { motion } from "motion/react";

export const Overlay = styled(motion.div)`
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

export const Container = styled(motion.div)`
  background: #fff;
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  padding: 24px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);

  select {
    padding: 8px 12px;
    font-size: var(--min-text);
    border: 1px solid #ccc;
    border-radius: 4px;
    cursor: pointer;
    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.colors.primaryShared};
    }
  }
`;

export const Header = styled.div`
  margin-bottom: 16px;
  text-align: center;
`;

export const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 12px;
`;

export const StyledInput = styled.input`
  padding: 8px 12px;
  font-size: var(--min-text);
  border: 1px solid #ccc;
  border-radius: 4px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primaryShared};
  }
`;
export const StyledSelect = styled.select`
  padding: 8px 12px;
  font-size: var(--min-text);
  border: 1px solid #ccc;
  border-radius: 4px;
  height: 41px;
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primaryShared};
  }
`;

export const StyledTextarea = styled.textarea`
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

// export const StyledSelect = styled.select`
//   padding: 8px 12px;
//   font-size: var(--min-text);
//   border: 1px solid #ccc;
//   border-radius: 4px;
//   background-color: #fff;

//   &:focus {
//     outline: none;
//     border-color: ${({ theme }) => theme.colors.primaryShared};
//   }
// `;

export const ErrorText = styled.div`
  color: red;
  font-size: var(--min-text);
`;

export const SubmitButton = styled(PrimarySharedButton)`
  margin-top: 8px;
`;
