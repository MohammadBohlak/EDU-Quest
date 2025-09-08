import { Outlet } from "react-router-dom";
import React, { use, useEffect } from "react";
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
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

const Dashboard = () => {
  const { t } = useTranslation();
  const role = useSelector((state) => state.user.user.role);
  useEffect(() => {
    // const user = userData.user;
    console.log(role);
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (!token) {
      window.location.href = "/login";
    }
    if (user.role !== "admin" && user.role !== "publisher") {
      window.location.href = "unauthorized";
    }
  }, []);
  return (
    <StyledDashboard>
      <SidebarPlace>
        <Sidebar>
          <Items>
            {role === "admin" && (
              <SidebarItem to="/dashboard/users">
                <NormalTextShared>
                  <HiUsers />
                </NormalTextShared>
                <NormalTextShared>{t("dashboard.users")}</NormalTextShared>
              </SidebarItem>
            )}
            <SidebarItem to="/dashboard/courses">
              <NormalTextShared>
                <GiTeacher />
              </NormalTextShared>
              <NormalTextShared>{t("dashboard.courses")}</NormalTextShared>
            </SidebarItem>
            <SidebarItem to="/dashboard/myCourses">
              <NormalTextShared>
                <GiTeacher />
              </NormalTextShared>
              <NormalTextShared style={{ textWrap: "nowrap" }}>
                {t("dashboard.myCourses")}
              </NormalTextShared>
            </SidebarItem>
            <SidebarItem to="/dashboard/settings">
              <NormalTextShared>
                <IoSettings />
              </NormalTextShared>
              <NormalTextShared>{t("dashboard.settings")}</NormalTextShared>
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
              <NormalTextShared>{t("dashboard.logout")}</NormalTextShared>
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
