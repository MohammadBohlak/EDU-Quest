import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledDashboard = styled.div`
  /* width: 100vw; */
  min-height: 100vh;
  display: flex;
`;
export const Sidebar = styled.div`
  width: 20%;
  height: 100%;
  position: fixed;
  top: 0;
  left: ${({ theme }) => (theme.lang === "en" ? "0" : "auto")};
  right: ${({ theme }) => (theme.lang === "ar" ? "0" : "auto")};
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 30px 0;
  @media (max-width: 768px) {
    width: 100%;
    height: 50px;
    flex-direction: row;
    align-items: center;
    padding: 0 20px;
    bottom: 0;
    top: auto;
    z-index: 10;
  }
`;
export const SidebarPlace = styled.div`
  width: 20%;
  position: relative;
  height: 100vh;
  @media (max-width: 768px) {
    width: 100%;
    height: 50px;
    position: fixed;
    z-index: 10;
    bottom: 0;
  }
`;
export const Main = styled.div`
  width: ${({ $isAdmin }) => ($isAdmin ? "80%" : "100%")};
  padding: 40px;
  min-height: 100vh;
  /* background-color: ${({ theme }) => theme.colors.backgroundMutedShared}; */
  background-color: ${({ theme }) => theme.colors.backgroundSections};
  @media (max-width: 768px) {
    width: 100%;
    padding: 20px;
    padding-bottom: 100px;
  }
`;
export const SidebarItem = styled(Link)`
  font-weight: 400;
  font-size: var(--small-text);
  color: black;
  text-decoration: none;
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 0 30px;
  &:hover > * {
    color: ${({ theme }) => theme.colors.primaryShared}!important;
  }
  @media (max-width: 768px) {
    padding: 0;
    svg {
      /* display: none; */
    }
  }
`;
export const Items = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;
export const InformationAccount = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-size: var(--normal-text);
`;
export const LogutBtn = styled.button`
  position: fixed;
  bottom: 20px;
  left: 5px;
  background: red;
  padding: 5px;
  color: white;
  font-size: var(--small-text);
  font-weight: 400;
  border: 2px solid red;
  border-radius: 5px;
  display: flex;
  gap: 5px;
  z-index: 10;
  &:hover {
    background: white;
    color: red;
  }
`;
