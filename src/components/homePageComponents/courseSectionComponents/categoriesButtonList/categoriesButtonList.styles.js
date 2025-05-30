import { Button, Container } from "react-bootstrap";
import styled from "styled-components";

// حاوية أزرار تمرير أفقي بدون التفاف
export const ButtonScrollContainer = styled(Container)`
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  white-space: nowrap;
  padding: 20px 80px;
  margin-top: 20px ; 
  justify-content: space-between;
  background-color: ${({ theme }) => theme.colors.backgroundMutedShared};
  border-radius: 20px; 
  /* اختياري: تخصيص شريط التمرير */
  &::-webkit-scrollbar {
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }

  @media (max-width: 992px){
    padding: 11px 5px;
  }
`;

export const StyledButton = styled(Button)`
  margin: 0px 5px;
  flex: 0 0 auto;  /* يحافظ على عرض الزر الثابت */
  background-color:white; 
  border-color: white;
  /* color: ${({ theme }) => theme.colors.primaryShared}; */
  color:black; 
  font-weight: 700;
  font-size: var(--normal-text);
  border-radius: 15px;
  padding: 16px 39px; 
  &.active, &:hover, &.btn:active {
    background-color:  ${({ theme }) => theme.colors.primaryShared};
    border-color:  ${({ theme }) => theme.colors.primaryShared};
    color: #fff;
  }

`;
