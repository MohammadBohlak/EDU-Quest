import styled from "styled-components";
import { useSelector } from "react-redux";
import { SmallTextShared } from "../../common/texts/SmallText";
import { NormalTextShared } from "../../common/texts/NormalText";
import { AnimatePresence, motion } from "motion/react";

const StyledToast = styled(motion.div)`
  position: fixed;
  z-index: 1000000;
  left: ${({ theme }) => (theme.lang === "en" ? "50px" : "auto")};
  right: ${({ theme }) => (theme.lang === "ar" ? "50px" : "auto")};
  bottom: 50px;
  width: 400px;
  height: 100px;
  background-color: ${({ $bg }) => $bg};
  border-radius: 15px;
  display: flex;
  flex-direction: column;
`;
const ToastHeader = styled.div`
  height: 40px;
  border-radius: inherit;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  background-color: ${({ $bg }) => $bg};
  padding: 0 15px;
  display: flex;
  align-items: center;
`;
const ToastBody = styled.div`
  padding: 0 15px;
  display: flex;
  align-items: center;
  flex: 1;
`;
const Title = styled.span`
  font-size: var(--normal-text);
  font-weight: bold;
  color: white;
`;
const Text = styled.span`
  font-size: var(--small-text);
  font-weight: bold;
  color: ${({ $color }) => ($color ? $color : "white")};
`;
const Toast = ({ $err, message, show }) => {
  const lang = useSelector((state) => state.lang.language);
  return (
    <AnimatePresence>
      {show && (
        <StyledToast
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
          $bg={$err ? "#ffcdd2" : "#c8e6c9 "}
        >
          <ToastHeader $bg={$err ? "#f44336" : "#4caf50 "}>
            <Title>
              {$err
                ? lang === "en"
                  ? "Error"
                  : "خطأ"
                : lang === "en"
                ? "Success"
                : "تمت العملية بنجاح"}
            </Title>
          </ToastHeader>
          <ToastBody>
            <Text $color={$err ? "#D32F2F" : "#388E3C "}>{message}</Text>
          </ToastBody>
        </StyledToast>
      )}
    </AnimatePresence>
  );
};

export default Toast;
