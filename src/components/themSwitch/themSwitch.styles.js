import styled from "styled-components";

// إنشاء أنماط زر التبديل
export const SwitchWrapper = styled.div`
  position: relative;
  width: 60px;
  height: 30px;
  background-color: ${(props) => (props.$active ? "#d1b3ff" : "#f3e8ff")};
  border-radius: 30px;
  cursor: pointer;
  transition: background-color 0.3s;
`;

export const Knob = styled.div`
  position: absolute;
  top: 3px;
  left: ${(props) => (props.$active ? "33px" : "3px")};
  width: 24px;
  height: 24px;
  background-color: white;
  border-radius: 50%;
  box-shadow: 0 0 5px rgba(128, 0, 128, 0.5);
  transition: left 0.3s;
`;