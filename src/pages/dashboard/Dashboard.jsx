import { Outlet } from "react-router-dom";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { NormalTextShared } from "../../components/common/texts/NormalText";
import { GiTeacher } from "react-icons/gi";
import { HiUsers } from "react-icons/hi";
import { CiLogout } from "react-icons/ci";
import { IoSettings } from "react-icons/io5";
import LanguageSwitcher from "../../components/langSwitch/LangSwitch";
import ThemeSwitch from "../../components/themSwitch/ThemSwitch";
import {
  Items,
  Main,
  Sidebar,
  SidebarItem,
  SidebarPlace,
  StyledDashboard,
} from "./dashboard.styles";

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
        <div className="d-flex gap-4 mb-5 align-items-center justify-content-end">
          <LanguageSwitcher />
          <ThemeSwitch />
        </div>
        <Outlet />
      </Main>
    </StyledDashboard>
  );
};

export default Dashboard;
