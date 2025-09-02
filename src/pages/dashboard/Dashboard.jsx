import { Outlet } from "react-router-dom";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { NormalTextShared } from "../../components/common/texts/NormalText";
import { GiTeacher } from "react-icons/gi";
import { HiUsers } from "react-icons/hi";
import { CiLogout } from "react-icons/ci";
import { IoSettings } from "react-icons/io5";

const StyledDashboard = styled.div`
  /* width: 100vw; */
  min-height: 100vh;
  display: flex;
`;
const Sidebar = styled.div`
  width: 20%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
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
const SidebarPlace = styled.div`
  width: 20%;
  position: relative;
  height: 100vh;
  @media (max-width: 768px) {
    width: 100%;
    height: 50px;
    position: fixed;
    z-index: 10;
  }
`;
const Main = styled.div`
  width: 80%;
  padding: 40px;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.backgroundMutedShared};
  @media (max-width: 768px) {
    width: 100%;
    padding: 20px;
  }
`;
const SidebarItem = styled(Link)`
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
const Items = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;
const Dashboard = () => {
  return (
    <StyledDashboard>
      <SidebarPlace>
        <Sidebar>
          <Items>
            <SidebarItem to="/dashboard/users">
              <NormalTextShared>
                <HiUsers />
              </NormalTextShared>
              <NormalTextShared>Users</NormalTextShared>
            </SidebarItem>
            <SidebarItem to="/dashboard/courses">
              <NormalTextShared>
                <GiTeacher />
              </NormalTextShared>
              <NormalTextShared>Courses</NormalTextShared>
            </SidebarItem>
            <SidebarItem to="/dashboard/settings">
              <NormalTextShared>
                <IoSettings />
              </NormalTextShared>
              <NormalTextShared>Settings</NormalTextShared>
            </SidebarItem>
          </Items>
          <div>
            <SidebarItem
              onClick={() => {
                console.log("log out");
              }}
            >
              <NormalTextShared>
                <CiLogout />
              </NormalTextShared>
              <NormalTextShared>Logout</NormalTextShared>
            </SidebarItem>
          </div>
        </Sidebar>
      </SidebarPlace>
      <Main>
        <Outlet />
      </Main>
    </StyledDashboard>
  );
};

export default Dashboard;
