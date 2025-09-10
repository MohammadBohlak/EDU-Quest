import React, { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import {
  ModalContainer,
  Option,
  Overlay,
  QuestionText,
  SubmitButton,
} from "./practiceModal.styles";
import { useTranslation } from "react-i18next";

const PracticeModal = ({ isOpen, setIsOpen, practice, handleSubmit }) => {
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const { t } = useTranslation();
  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay>
          <ModalContainer
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <QuestionText>{practice.content}</QuestionText>
            {practice.options.map((option, index) => (
              <Option key={index}>
                <input
                  type="radio"
                  name="answer"
                  value={option}
                  checked={selectedAnswer === option}
                  onChange={() => setSelectedAnswer(option)}
                />{" "}
                {option}
              </Option>
            ))}
            <div className="d-flex justify-content-end">
              <SubmitButton
                onClick={() => {
                  handleSubmit(selectedAnswer);
                }}
                disabled={!selectedAnswer}
              >
                {t("modalPractice")}
              </SubmitButton>
            </div>
          </ModalContainer>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default PracticeModal;
