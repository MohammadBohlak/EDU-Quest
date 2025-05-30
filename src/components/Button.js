// src/components/Button.js
import styled from 'styled-components';

const CustomButton = styled.button`
  background: ${({theme, $bg}) => $bg? $bg : theme.colors.primary};
  color: ${({theme, $color}) => $color?  $color : theme.colors.textSecondary};
  border: none;
  padding: 20px 27px;
  height: 80px;
  font-size: 2.4rem;
  font-weight: 700;
  border-radius: 25px;
  cursor: pointer;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.9;
  }
`;

export default CustomButton;