import { AnimatePresence, motion } from "motion/react";
import React from "react";
import styled from "styled-components";
import { NormalTextShared } from "../../../common/texts/NormalText";
import { SmallTextShared } from "../../../common/texts/SmallText";

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

const Modal = styled(motion.div)`
  background: ${({ theme }) => theme.colors.backgroundMutedShared};
  border-radius: 8px;
  width: 400px;
  max-width: 90%;
  padding: 24px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const ModalBtn = styled.button`
  /* width: 100px; */
  background-color: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
  padding: 8px 30px;
  font-size: var(--small-text);
  text-align: center;
  border-radius: 8px;
  border: 2px solid ${({ theme }) => theme.colors.primaryShared};
  &:hover {
    background-color: transparent;
    color: ${({ theme }) => theme.colors.primaryShared};
  }
`;

const ConfirmModal = ({ onClose, isOpen, handleOk, title }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <Modal
            initial={{ scale: 1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.5 }} // ← هنا تحدد مدة الأنيميشن بالثواني
            onClick={(e) => e.stopPropagation()}
          >
            <SmallTextShared>{title}</SmallTextShared>
            <div className="d-flex justify-content-between">
              <ModalBtn
                onClick={handleOk}
                $bg="var(--primary-shared)"
                $color="white"
              >
                Ok
              </ModalBtn>
              <ModalBtn onClick={onClose} $bg="white">
                Cansel
              </ModalBtn>
            </div>
          </Modal>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default ConfirmModal;
