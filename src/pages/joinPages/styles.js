import { Form } from "react-bootstrap";
import styled from "styled-components";

export const SignUpContainer = styled.div`
  display: grid;
  background-color: ${({ theme }) => theme.colors.backgroundMutedShared};
  min-height: 100vh;
  grid-template-columns: 1fr 1fr;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const LeftSection = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  scale: ${({ theme }) => (theme.lang === "en" ? "1" : "-1")};
  overflow: hidden;
  @media (max-width: 768px) {
    display: none;
  }
  img {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
  }
  .img1 {
    z-index: 1;
    opacity: 0.8;
  }
  .img2 {
    left: -30px;
    opacity: 0.6;
  }
  .img3 {
    opacity: 0.4;
    left: -60px;
    /* left: 60px; */
    /* z-index: -2; */
    /* opacity: 0.5; */
    /* width: 100%; */
  }
`;

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 40px;
  /* background-color: white; */
`;

export const StyledForm = styled(Form)`
  background-color: ${({ theme }) => theme.colors.backgroundMutedShared};
  width: 100%;
  max-width: 400px;
  /* display: flex;
  flex-direction: column; */
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
  align-items: center;
  input {
    height: 40px;
    border: none;
    outline: none;
    font-size: var(--min-text);
    border: 1px solid transparent;

    &::placeholder {
      color: ${({ theme }) => theme.colors.textMuted};
    }
    &:focus {
      outline: none;
      box-shadow: none;
      border: 1px solid ${({ theme }) => theme.colors.primaryShared};
    }
  }
`;
