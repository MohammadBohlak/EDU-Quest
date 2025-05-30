// src/components/Button.js
import styled from "styled-components";

const SecondaryButton = styled.button`
  background: ${({ theme }) => theme.colors.backgroundSections};
  color: ${({ theme }) => theme.colors.primary};
  border: 3px solid ${({ theme }) => theme.colors.primary};
  padding: 20px 27px;
  height: 80px;
  font-size: var(--small-text);
  font-weight: 500;
  border-radius: 25px;
  cursor: pointer;
  transition: opacity 0.3s;
  line-height: 100%;

  &:hover {
    opacity: 0.9;
  }
  @media (max-width: 992px) {
    height: 41px;
    padding: 10px 13px;
  border-radius: 10px;
    border-width: 2px;
  }
`;

export default SecondaryButton;
