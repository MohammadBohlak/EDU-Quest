// src/components/Button.js
import styled from "styled-components";

const PrimaryButton = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.textTheme};
  border: none;
  padding: 20px 27px;
  height: 80px;
  font-size: var(--small-text);
  font-weight: 500;
  border-radius: 25px;
  cursor: pointer;
  line-height: 100%;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.9;
  }
  @media (max-width: 992px) {
    height: 41px;
    padding: 11px 13px;
    border-radius: 10px;
  }
`;
export default PrimaryButton;

export const PrimarySharedButton = styled(PrimaryButton)`
  width: 117px ; 
  height: 42px;
  padding: 9px 27px;
  font-weight: normal;
  border-radius: 15px;
  background: ${({ theme }) => theme.colors.primaryShared}; 
  color: white ; 
`
