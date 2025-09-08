import { MdDeleteForever } from "react-icons/md";
import { AnimatePresence, motion } from "motion/react";
import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { NormalTextShared } from "../../../common/texts/NormalText";
import {
  SmallTextPrimaryShared,
  SmallTextShared,
} from "../../../common/texts/SmallText";
import { api } from "../../../../utils/api/api";
import { DataContext } from "../../../../context/DataProvider";
import { useTranslation } from "react-i18next";

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
  z-index: 1100;
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
  border: 2px solid ${({ $bg }) => $bg};
  &:hover {
    background-color: ${({ $color }) => $color};
    color: ${({ $bg }) => $bg};
  }
`;

const ModalScientificFields = ({ onClose, isOpen }) => {
  const { categories, refresh } = useContext(DataContext);
  const { t } = useTranslation();
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
            transition={{ duration: 0.5 }}
            onClick={(e) => e.stopPropagation()}
          >
            <SmallTextPrimaryShared className="w-100 text-center">
              {t("modalScientificFields")}
            </SmallTextPrimaryShared>
            <div className="d-flex flex-column">
              {categories.map(
                (category, index) =>
                  category.name != "All" && (
                    <div key={index} className="d-flex justify-content-between">
                      <ModalBtn
                        className="mb-3 w-100"
                        onClick={() => {
                          const token = localStorage.getItem("token");
                          api
                            .delete(`categories/${category.id}`, {
                              headers: {
                                Authorization: `Bearer ${token}`,
                              },
                            })
                            .then(() => {
                              onClose();
                              refresh();
                            })
                            .catch((err) => {
                              console.log(err);
                            });
                        }}
                        $color="#fd4646"
                        $bg="white"
                      >
                        <MdDeleteForever /> {category.name}
                      </ModalBtn>
                    </div>
                  )
              )}
            </div>
          </Modal>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default ModalScientificFields;
