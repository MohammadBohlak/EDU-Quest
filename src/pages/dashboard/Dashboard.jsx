import { styled } from "styled-components";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import {
  NormalText,
  NormalTextShared,
} from "../../components/common/texts/NormalText";
import { GiTeacher } from "react-icons/gi";
import { HiUsers } from "react-icons/hi";
import { CiLogout } from "react-icons/ci";
import LanguageSwitcher from "../../components/langSwitch/LangSwitch";
import ThemeSwitch from "../../components/themSwitch/ThemSwitch";
import {
  InformationAccount,
  Items,
  LogutBtn,
  Main,
  Sidebar,
  SidebarItem,
  SidebarPlace,
  StyledDashboard,
} from "./dashboard.styles";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import MyContainer from "../../components/ui/myContainer/MyContainer";
import { FaRegUserCircle } from "react-icons/fa";
import { api } from "../../utils/api/api";
import { logout } from "../../store/slices/userSlice";

const Dashboard = () => {
  const { t } = useTranslation();
  const role = useSelector((state) => state.user.user.role);
  const userName = useSelector((state) => state.user.user.name);
  const navigate = useNavigate();
  const userID = useSelector((s) => s.user.user.id);
  const dispatch = useDispatch();
  const handleLogout = () => {
    const token = localStorage.getItem("token");
    api
      .post(
        "logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        navigate("/");
        dispatch(logout());
      })
      .catch((eer) => {
        console.log(eer);
      });
  };
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
      {role === "admin" && (
        <>
          <SidebarPlace>
            <Sidebar>
              <Items>
                <SidebarItem to="/dashboard/users">
                  <NormalTextShared>
                    <HiUsers />
                  </NormalTextShared>
                  <NormalTextShared>{t("dashboard.users")}</NormalTextShared>
                </SidebarItem>

                <SidebarItem to="/dashboard/courses">
                  <NormalTextShared>
                    <GiTeacher />
                  </NormalTextShared>
                  <NormalTextShared>{t("dashboard.courses")}</NormalTextShared>
                </SidebarItem>
              </Items>
              <div>
                <SidebarItem onClick={handleLogout}>
                  <NormalTextShared>
                    <CiLogout />
                  </NormalTextShared>
                  <NormalTextShared>{t("dashboard.logout")}</NormalTextShared>
                </SidebarItem>
              </div>
            </Sidebar>
          </SidebarPlace>
        </>
      )}

      {role == "admin" ? (
        <>
          <Main $isAdmin={role == "admin"}>
            <div className="d-flex justify-content-between mb-5 align-items-center">
              <div>
                <NormalText>
                  <InformationAccount>
                    <FaRegUserCircle />
                    {/* <Link to={`/profile/${userID}`}> */}
                    <NormalText>{userName}</NormalText>
                    {/* </Link> */}
                  </InformationAccount>
                </NormalText>
              </div>
              <div className="d-flex gap-4  align-items-center justify-content-end">
                <LanguageSwitcher />
                <ThemeSwitch />
              </div>
            </div>
            <Outlet />
          </Main>
        </>
      ) : (
        <div style={{ backgroundColor: "var(--back-sections)", width: "100%" }}>
          <MyContainer>
            <Main $isAdmin={role == "admin"}>
              <div className="d-flex justify-content-between mb-5 align-items-center">
                <div>
                  <NormalText>
                    <InformationAccount>
                      <FaRegUserCircle />
                      <NormalText>{userName}</NormalText>
                    </InformationAccount>
                  </NormalText>
                </div>
                <div className="d-flex gap-4  align-items-center justify-content-end">
                  <LanguageSwitcher />
                  <ThemeSwitch />
                </div>
              </div>
              <Outlet />
            </Main>
          </MyContainer>
        </div>
      )}
      {role == "publisher" && (
        <LogutBtn onClick={handleLogout}>
          <div>
            <CiLogout />
          </div>
          <div>{t("dashboard.logout")}</div>
        </LogutBtn>
      )}
    </StyledDashboard>
  );
};

export default Dashboard;
