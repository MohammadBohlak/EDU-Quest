import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./styles/themes";
import CustomNavbar from "./components/ui/navbar/Navbar";
import { GlobalStyles } from "./styles/GlobalStyles";
import Hero from "./components/homePageComponents/heroSection/Hero";
import "./i18n";

import { useTranslation } from "react-i18next";
import CoursesSection from "./components/homePageComponents/courseSectionComponents/CourseSection";
import FAQSection from "./components/homePageComponents/FAQSectionComponents/FAQSection";
import AboutUs from "./components/homePageComponents/aboutUsSection/AboutUs";
import Testimonial from "./components/homePageComponents/testimonialSection/Testimonial";
import Footer from "./components/ui/footer/Footer";
import SignUp from "./pages/joinPages/SignUp";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./pages/joinPages/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import axios from "axios";
import { useEffect, useState } from "react";
import Courses from "./pages/courses/Courses";
import DataProvider from "./context/DataProvider";
import Loader from "./components/ui/Loader";
import { api } from "./utils/api/api";
import Course from "./pages/course/Course";
import VideoPlayer from "./components/ui/videoPlayer/VideoPlayer";
import ModalScientificFields from "./components/ui/modals/modalScientificFields/ModalScientificFields";
import EditCourseModal from "./components/coursesPageComponents/editCourseModal/EditCourseModal";
import Users from "./pages/users/Users";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";
import { login, logout } from "./store/slices/userSlice";
import CoursesList from "./pages/courses/CoursesList";
import MyContainer from "./components/ui/myContainer/MyContainer";
import { LogutBtn } from "./pages/dashboard/dashboard.styles";
import { CiLogout } from "react-icons/ci";
import ProfileModal from "./components/ui/modals/profileModal/ProfileModal";
const checkYouTubeVideo = async (videoId) => {
  const isFound = await axios
    .get(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
    )
    .then((res) => {
      return true;
    })
    .catch((err) => {
      console.log();
      if (err.response.status === 404) return false;
    });
  return isFound;
  // checkYouTubeVideo("8YVCaUm35oA").then((res) => console.log(res));
};

function App() {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const theme = useSelector((state) => state.theme);
  const isLoading = useSelector((state) => state.loader.isLoading);
  const direction = i18n.language === "ar" ? "rtl" : "ltr";
  const dispatch = useDispatch();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [token, setToken] = useState(localStorage.getItem("token"));
  const isAuthenticated = useSelector((s) => s.user.isAuthenticated);
  // const dispatch = useDispatch();
  useEffect(() => {
    // const token = localStorage.getItem("token");
    // const user = JSON.parse(localStorage.getItem("user"));
    if (token && user) {
      dispatch(login({ token, user }));
    }
  }, []);
  const { t } = useTranslation();
  const handleLogout = () => {
    const token = localStorage.getItem("token");
    // localStorage.removeItem("token");
    // localStorage.removeItem("user");

    dispatch(logout());
    // api
    //   .post(
    //     "logout",
    //     {},
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     }
    //   )
    //   .then((res) => {
    //     dispatch(logout());

    //     // navigate("/");
    //   })
    //   .catch((err) => {
    //     console.error("Logout failed:", err);
    //   });
  };
  return (
    <div dir={direction}>
      <ThemeProvider
        theme={
          theme === "light"
            ? { ...lightTheme, lang: i18n.language }
            : { ...darkTheme, lang: i18n.language }
        }
      >
        <DataProvider>
          <GlobalStyles />
          {isLoading && <Loader />}
          {/* <SignUp /> */}
          <Routes>
            <Route
              // path="/"
              index
              element={
                <>
                  <CustomNavbar />
                  <Hero />
                  <CoursesSection />
                  <FAQSection />
                  <AboutUs />
                  <Testimonial />
                  <Footer />
                  {isAuthenticated && (
                    <LogutBtn
                      onClick={() => {
                        handleLogout();
                        // window.location.reload();
                      }}
                    >
                      <div>
                        <CiLogout />
                      </div>
                      <div>{t("dashboard.logout")}</div>
                    </LogutBtn>
                  )}
                </>
              }
            />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/courses/:id"
              element={
                <div className="mt-5">
                  <MyContainer>
                    <Course />
                  </MyContainer>
                </div>
              }
            />
            <Route path="/courses/:id/:videoId" element={<VideoPlayer />} />
            <Route path="/profile/:id" element={<ProfileModal />} />

            <Route path="/dashboard" element={<Dashboard />}>
              <Route index element={<div>dashboard</div>} />
              <Route path="users" element={<Users />} />
              <Route path="courses" element={<Courses />} />
              <Route path="courses/:id" element={<Course />} />
              <Route path="courses/:id/:videoId" element={<VideoPlayer />} />
              <Route
                path="courses/edit/:id"
                element={
                  <EditCourseModal
                    isOpen={true}
                    onClose={() => navigate(`dashboard/courses`)}
                  />
                }
              />
              {/* <Unauthorized/> */}
              <Route path="settings" element={<div>settings</div>} />
            </Route>
            <Route path="/unauthorized" element={<Unauthorized />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </DataProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
