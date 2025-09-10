import { motion } from "motion/react";
import { Table } from "react-bootstrap";
import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  select,
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

export const Controls = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

export const SearchInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  height: 40px;
  font-size: var(--min-text);
  border-radius: 8px;
`;

export const FilterSelect = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  font-size: var(--min-text);
  border-radius: 8px;
  height: 40px;
`;

export const StyledTable = styled(Table)`
  z-index: 1;
  position: relative;
  th {
    text-align: ${({ theme }) => (theme.lang === "ar" ? "right" : "left")};
  }
  th,
  td {
    background-color: #f4f4f48e;
    vertical-align: middle;
  }
  td {
    position: relative;
    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: blue;
      opacity: 0;
      transition: opacity 0.3s ease;

      pointer-events: none;
    }
  }
  .selected td {
    &:before {
      opacity: 0.2;
      z-index: 1;
      pointer-events: initial;
    }
  }
`;

export const Th = styled.th`
  text-align: left;
  padding: 0.6rem;
`;

export const CustomBtn = styled.button`
  background-color: ${({ $bg }) => $bg};
  color: #fff;
  height: 100%;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid transparent;
  border-radius: 8px;
  &:hover {
    background-color: transparent;
    color: ${({ $bg }) => $bg};
    border-color: ${({ $bg }) => $bg};
  }
  svg {
  }
`;
export const InputCheck = styled.input`
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: ${({ theme }) => theme.colors.primaryShared};
  position: relative;
  z-index: 1;
`;
export const DelBtn = styled(motion.div)`
  height: 40px;
  width: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.colors.textTheme};
  transition: color 0.3s;
  font-size: var(--small-text);
  padding: 2px 15px;
  background-color: #ff5050;
  border-radius: 8px;
  position: absolute;
  right: ${({ theme }) => (theme.lang == "en" ? "0" : "auto")};
  left: ${({ theme }) => (theme.lang === "en" ? "auto" : "0")};
  @media (max-width: 768px) {
    height: 40px;
    padding: 2px 7px;
    width: 87px;
    font-size: var(--min-text);
  }
`;
