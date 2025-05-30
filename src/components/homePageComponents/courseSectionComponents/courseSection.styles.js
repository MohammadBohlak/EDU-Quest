import { Form, Row } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import styled from "styled-components";
import MyContainer from "../../ui/myContainer/MyContainer";

export const SectionContainer = styled(MyContainer)`
  align-items: center;
  margin-top: 20px;
  @media (max-width: 768px) {
    text-align: center;
    row-gap: 10px;
  }
`;

export const SearchInput = styled(Form.Control)`
  height: 40px;
  background-color: ${({ theme }) => theme.colors.backgroundMutedShared};
  font-size: var(--normal-text);
  padding: 24px 30px;
  border-radius: 10px;
  &:focus {
    border: 1px solid ${({ theme }) => theme.colors.primaryShared};
    box-shadow: none;
    outline: none;
  }
`;

export const SearchIcon = styled(FaSearch)`
  position: absolute;
  right: ${({ theme }) => theme.lang === "en" ? "24px" : "auto"};
  left: ${({ theme }) => theme.lang === "en" ? "auto" : "24px"};
  top: 10px;
  font-size: 30px;
  padding: 5px;
  border-radius: 5px;
  color: white;
  background-color: ${({ theme }) => theme.colors.primaryShared};
  cursor: pointer;
`;
